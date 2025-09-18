// src/hooks/cart/useCartQuantity.ts
import { useState } from 'react';
import { useUpdateCartItem } from './useUpdateCartItem ';
import { useRemoveCartItem } from './useRemoveCartItem ';
import { useAddToCart } from './useAddToCart ';
import type { CartGroup, CartItem, CartMenu } from '@/types/cart-type';

interface UseCartQuantityProps {
  initialGroups: CartGroup[];
}

export const useCartQuantity = ({ initialGroups }: UseCartQuantityProps) => {
  const [groups, setGroups] = useState<CartGroup[]>(initialGroups);

  const updateCartMutation = useUpdateCartItem();
  const removeCartMutation = useRemoveCartItem();
  const addCartMutation = useAddToCart();

  const findCartItem = (
    itemId: number
  ): { groupIndex: number; itemIndex: number; item: CartItem } | null => {
    for (let gi = 0; gi < groups.length; gi++) {
      const group = groups[gi];
      const ii = group.items.findIndex((i) => i.menu.id === itemId);
      if (ii !== -1) {
        return { groupIndex: gi, itemIndex: ii, item: group.items[ii] };
      }
    }
    return null;
  };

  const updateQuantity = (itemId: number, newQty: number) => {
    const found = findCartItem(itemId);
    if (!found) return;

    const { groupIndex, itemIndex, item } = found;

    setGroups((prev) => {
      const updated = [...prev];
      const updatedItems = [...updated[groupIndex].items];

      if (newQty < 1) {
        updatedItems.splice(itemIndex, 1);
      } else {
        updatedItems[itemIndex] = {
          ...item,
          quantity: newQty,
          itemTotal: item.menu.price * newQty,
        };
      }

      updated[groupIndex] = {
        ...updated[groupIndex],
        items: updatedItems,
        subtotal: updatedItems.reduce((sum, i) => sum + i.itemTotal, 0),
      };

      return updated;
    });

    if (newQty < 1) {
      removeCartMutation.mutate(item.id);
    } else {
      updateCartMutation.mutate({ id: item.id, payload: { quantity: newQty } });
    }
  };

  const increase = (itemId: number) => {
    const found = findCartItem(itemId);
    if (!found) return;
    updateQuantity(itemId, found.item.quantity + 1);
  };

  const decrease = (itemId: number) => {
    const found = findCartItem(itemId);
    if (!found) return;
    updateQuantity(itemId, found.item.quantity - 1);
  };

  // ✅ Tambahkan fungsi add
  const add = (restaurantId: number, menu: CartMenu) => {
    setGroups((prev) => {
      const existingGroupIndex = prev.findIndex(
        (g) => g.restaurant.id === restaurantId
      );

      let updated = [...prev];

      if (existingGroupIndex === -1) {
        // resto belum ada
        updated = [
          ...prev,
          {
            restaurant: { id: restaurantId, name: '', logo: '' }, // isi minimal
            items: [
              {
                id: Date.now(), // temporary id lokal
                menu,
                quantity: 1,
                itemTotal: menu.price,
              },
            ],
            subtotal: menu.price,
          },
        ];
      } else {
        // resto sudah ada
        const group = updated[existingGroupIndex];
        updated[existingGroupIndex] = {
          ...group,
          items: [
            ...group.items,
            {
              id: Date.now(),
              menu,
              quantity: 1,
              itemTotal: menu.price,
            },
          ],
          subtotal: group.subtotal + menu.price,
        };
      }

      return updated;
    });

    // Panggil API
    addCartMutation.mutate({
      restaurantId,
      menuId: menu.id,
      quantity: 1,
    });
  };

  return {
    groups,
    setGroups,
    increase,
    decrease,
    updateQuantity,
    add, // expose add
  };
};
