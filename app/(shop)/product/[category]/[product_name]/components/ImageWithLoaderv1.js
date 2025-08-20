'use client';
import ImageLazy from 'next/image';


const ImageWithLoaderv1 = ({ src, alt, className, isLoading, imgHeight, type }) => {
  
    const imgStyle = className ? className : '';
   
    return (
        <div>
            
            {
                type == 'sneaker'  ?
                    <ImageLazy
                        className={`${imgStyle} ${imgHeight} ${(isLoading || (isLoading && type=='sneaker')) ? 'hidden' : ''} group-hover:scale-105 transition-all duration-300 ease-in-out min-w-full object-contain`}
                        src={src}
                        alt={alt}
                        onLoad={handleImageLoad}
                        height={100}
                        width={100}
                    />
                :
                <img
                    className={`${imgStyle} ${imgHeight} ${(isLoading || isLoading) ? 'hidden' : ''} group-hover:scale-105 transition-all duration-300 ease-in-out min-w-full object-contain`}
                    src={src}
                    alt={alt}
                    onLoad={handleImageLoad}
                />

            }
        </div>);
};

export default ImageWithLoaderv1;
