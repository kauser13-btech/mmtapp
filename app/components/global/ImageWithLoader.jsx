import { useEffect, useState } from 'react';
import ImageLazy from 'next/image';
import TailwindLoader from './TailwindLoader';
import TshirtPlaceholder from './TshirtPlaceholder';

const ImageWithLoader = ({ src, alt, className, isLoading, imgHeight, type }) => {
    const [loading, setLoading] = useState(true);
    const imgStyle = className ? className : '';
    const handleImageLoad = () => {
        setLoading(false);
    };

    useEffect(() => {
        // Check if the image is already loaded
        const image = new Image();
        image.src = src;

        if (image.complete) {
            setLoading(false);
        } else {
            setLoading(true);
        }
    }, [isLoading, src]);
    return (
        <div>
            {(isLoading || loading) && (
                (type == 'sneaker' || type == 'search')  ? <TailwindLoader height={imgHeight} /> : <TshirtPlaceholder imgHeight={imgHeight} />
            )}
            {
                type == 'sneaker'  ?
                    <ImageLazy
                        className={`${imgStyle} ${imgHeight} ${(isLoading || (loading && type=='sneaker')) ? 'hidden' : ''} group-hover:scale-105 transition-all duration-300 ease-in-out min-w-full object-contain`}
                        src={src}
                        alt={alt}
                        onLoad={handleImageLoad}
                        height={100}
                        width={100}
                    />
                :
                <img
                    className={`${imgStyle} ${imgHeight} ${(isLoading || loading) ? 'hidden' : ''} group-hover:scale-105 transition-all duration-300 ease-in-out min-w-full object-contain`}
                    src={src}
                    alt={alt}
                    onLoad={handleImageLoad}
                />

            }
        </div>);
};

export default ImageWithLoader;
