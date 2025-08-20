import React from 'react'

const FullPageLoader = ({ topMessage, bottomMessage }) => {
    return (
        <div className="fixed inset-0 bg-[#C9C9C9]/90 z-[999999999] flex items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-8">
                <img src="/images/loading.gif" alt="loading" className="size-[78px]" />
                <div className="flex flex-col text-[#222222] font-semibold text-[32px] text-center">
                    <p>{topMessage ?? 'Please wait'}</p>
                    <p>{bottomMessage ?? "It will take few moment"}</p>
                </div>
            </div>
        </div>
    )
}

export default FullPageLoader