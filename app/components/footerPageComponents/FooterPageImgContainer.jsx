import React from 'react'

const FooterPageImgContainer = ({bgImgName}) => {
    return (
        <div className={`w-full`}>
            <img src={`/images/footer/${bgImgName}` } alt="" />
        </div>

    )
}

export default FooterPageImgContainer