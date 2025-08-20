'use client';

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const DaisyModal = ({
  modalId = "my_modal_2",
  children,
  background = "bg-white",
  onClick,
  type = "general",
}) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  useEffect(() => {
    if (modalId && modalId !== "promotional_modal_id") {
      document.getElementById(modalId).close();
    }
  }, [pathname, searchParams])

  return (
    <dialog id={modalId} className="modal">
      <div className={`modal-box ${background}`}>{children}</div>
      {type !== "otp" && (
        <form onClick={onClick} method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      )}
    </dialog>
  );
};

export default DaisyModal;
