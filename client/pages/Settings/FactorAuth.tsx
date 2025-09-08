"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle2 } from "lucide-react";

type Method = "sms" | "email" | null;

interface Props {
  open: boolean;
  onClose: () => void;
  method: Method;
}

export default function TwoFactorSetupModal({ open, onClose, method }: Props) {
  const [step, setStep] = useState<"input" | "verify" | "loading" | "success">(
    "input",
  );
  const [value, setValue] = useState("");
  const [code, setCode] = useState("");

  const handleNext = () => {
    if (step === "input") setStep("verify");
    else if (step === "verify") {
      setStep("loading");
      setTimeout(() => {
        setStep("success");
      }, 2000);
    }
  };

  const reset = () => {
    setStep("input");
    setValue("");
    setCode("");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={reset}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {method === "sms" && "Setup SMS Authentication"}
            {method === "email" && "Setup Email Authentication"}
          </DialogTitle>
        </DialogHeader>

        {step === "input" && (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              {method === "sms"
                ? "Enter your phone number:"
                : "Enter your email address:"}
            </p>
            <Input
              type={method === "sms" ? "tel" : "email"}
              placeholder={
                method === "sms" ? "+99361234567" : "example@mail.com"
              }
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <Button className="w-full" onClick={handleNext}>
              Continue
            </Button>
          </div>
        )}

        {step === "verify" && (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Enter the code we sent to {value}.
            </p>
            <Input
              type="text"
              placeholder="6-digit code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <Button className="w-full" onClick={handleNext}>
              Verify
            </Button>
          </div>
        )}

        {step === "loading" && (
          <div className="flex flex-col items-center justify-center py-6 space-y-3">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Please wait...</p>
          </div>
        )}

        {step === "success" && (
          <div className="flex flex-col items-center justify-center py-6 space-y-3">
            <CheckCircle2 className="h-10 w-10 text-green-500" />
            <p className="text-sm font-medium text-green-600">
              Successfully secured!
            </p>
            <Button className="w-full mt-4" onClick={reset}>
              Done
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
