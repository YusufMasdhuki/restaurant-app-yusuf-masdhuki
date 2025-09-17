// src/hooks/cart/useCartQuantity.ts
import { useState } from 'react';
import type { CartGroup, CartItem } from '@/types/cart-type';
import { useUpdateCartItem } from './useUpdateCartItem ';
import { useRemoveCartItem } from './useRemoveCartItem ';

interface UseCartQuantityProps {
  initialGroups: CartGroup[];
}

export const useCartQuantity = ({ initialGroups }: UseCartQuantityProps) => {
  const [groups, setGroups] = useState<CartGroup[]>(initialGroups);

  const updateCartMutation = useUpdateCartItem();
  const removeCartMutation = useRemoveCartItem();

  const findCartItem = (
    itemId: number
  ): { groupIndex: number; itemIndex: number; item: CartItem } | null => {
    for (let gi = 0; gi < groups.length; gi++) {
      const group = groups[gi];
      const ii = group.items.findIndex((i) => i.id === itemId);
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

    // update state lokal
    setGroups((prev) => {
      const updated = [...prev];
      const updatedItems = [...updated[groupIndex].items];

      if (newQty < 1) {
        updatedItems.splice(itemIndex, 1); // hapus item kalau qty 0
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

    // panggil API
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

  return {
    groups,
    setGroups,
    increase,
    decrease,
    updateQuantity,
  };
};
