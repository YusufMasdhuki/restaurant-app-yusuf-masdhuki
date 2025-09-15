interface Props {
  images: string[];
}

const RestoImages: React.FC<Props> = ({ images }) => {
  return (
    <div className='grid grid-cols-2 gap-2 w-full h-auto pt-12 overflow-hidden rounded-lg'>
      {/* Kolom kiri (gambar utama) */}
      {images[0] && (
        <div className='h-[470px] w-full overflow-hidden rounded-lg'>
          <img
            src={images[0]}
            alt='main'
            className='w-full h-full object-cover object-center rounded-lg'
          />
        </div>
      )}

      {/* Kolom kanan */}
      <div className='grid grid-rows-3 gap-2 h-[470px] rounded-lg'>
        {/* baris atas */}
        {images[1] && (
          <div className='h-full row-span-2 w-full overflow-hidden rounded-lg'>
            <img
              src={images[1]}
              alt='top'
              className='w-full h-full object-cover object-center rounded-lg'
            />
          </div>
        )}

        {/* baris bawah */}
        <div className='grid grid-cols-2 gap-2 h-auto overflow-hidden rounded-lg'>
          {images[2] && (
            <div className='h-auto w-full overflow-hidden rounded-lg'>
              <img
                src={images[2]}
                alt='bottom-left'
                className='w-full h-full object-cover object-center rounded-lg'
              />
            </div>
          )}
          {images[0] && (
            <div className='h-auto w-full overflow-hidden rounded-lg'>
              <img
                src={images[0]}
                alt='bottom-right'
                className='w-full h-full object-cover object-center rounded-lg'
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RestoImages;
