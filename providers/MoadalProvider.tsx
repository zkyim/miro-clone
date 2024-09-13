"use client";

import RenameModal from "@/components/modal/RenameModal";
import { useEffect, useState } from "react";

const MoadalProvider = () => {
    const [isMounted, setIsmounted] = useState(false);

    useEffect(() => {
        setIsmounted(true);
    }, []);

    if (!isMounted) return null;
  return (
    <>
      <RenameModal />
    </>
  )
}

export default MoadalProvider
