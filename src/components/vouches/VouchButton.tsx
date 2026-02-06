"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Heart, CheckCircle } from "lucide-react";
import VouchDialog from "./VouchDialog";

interface VouchButtonProps {
  providerId: string;
  providerName: string;
  currentVouchCount: number;
  hasVouched?: boolean;
}

export default function VouchButton({
  providerId,
  providerName,
  currentVouchCount,
  hasVouched = false,
}: VouchButtonProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [showDialog, setShowDialog] = useState(false);
  const [vouchCount, setVouchCount] = useState(currentVouchCount);
  const [userHasVouched, setUserHasVouched] = useState(hasVouched);

  const handleClick = () => {
    if (!session?.user) {
      router.push(`/auth/signin?callbackUrl=/provider/${providerId}`);
      return;
    }

    if (userHasVouched) {
      // Already vouched, could show vouch details or allow removal
      return;
    }

    setShowDialog(true);
  };

  const handleVouchSuccess = () => {
    setVouchCount((prev) => prev + 1);
    setUserHasVouched(true);
    setShowDialog(false);
  };

  return (
    <>
      <button
        onClick={handleClick}
        disabled={userHasVouched}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
          userHasVouched
            ? "bg-green-100 text-green-700 cursor-default"
            : "bg-pink-100 text-pink-700 hover:bg-pink-200"
        }`}
      >
        {userHasVouched ? (
          <>
            <CheckCircle className="w-5 h-5" />
            You Vouched
          </>
        ) : (
          <>
            <Heart className="w-5 h-5" />
            Vouch ({vouchCount})
          </>
        )}
      </button>

      {showDialog && (
        <VouchDialog
          providerId={providerId}
          providerName={providerName}
          onClose={() => setShowDialog(false)}
          onSuccess={handleVouchSuccess}
        />
      )}
    </>
  );
}
