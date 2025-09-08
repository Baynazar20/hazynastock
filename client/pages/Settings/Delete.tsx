"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";

export default function DangerZone() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [timer, setTimer] = useState(15);
  const [loading, setLoading] = useState(false);
  const [reason, setReason] = useState("");

  useEffect(() => {
    if (open && step === 1 && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [open, step, timer]);

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setOpen(false);
        setStep(1);
        setTimer(15);
        setReason("");
        alert("Account deleted!"); // bu ýere API request gelmeli
      }, 15000);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-red-600">Danger Zone</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between p-4 border border-red-200 dark:border-red-800 rounded-lg">
          <div>
            <Label className="text-red-600">Delete Account</Label>
            <p className="text-sm text-muted-foreground">
              Permanently delete your account and all data
            </p>
          </div>
          <Button variant="destructive" size="sm" onClick={() => setOpen(true)}>
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Account
          </Button>
        </div>
      </CardContent>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {step === 1 && "Delete Account Confirmation"}
              {step === 2 && "Why are you deleting your account?"}
              {step === 3 && "Deleting..."}
            </DialogTitle>
          </DialogHeader>

          {step === 1 && (
            <div className="space-y-4">
              <p>
                If you delete your account, all your data will be permanently
                removed. This action cannot be undone.
              </p>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  disabled={timer > 0}
                  onClick={handleNext}
                >
                  {timer > 0 ? `Next (${timer})` : "Next"}
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <RadioGroup value={reason} onValueChange={setReason}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="low-quality" id="r1" />
                  <Label htmlFor="r1">Low quality</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="few-images" id="r2" />
                  <Label htmlFor="r2">Not enough pictures</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="dont-want" id="r3" />
                  <Label htmlFor="r3">I don’t want to use</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="family" id="r4" />
                  <Label htmlFor="r4">My mom said not to use</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="r5" />
                  <Label htmlFor="r5">Other</Label>
                </div>
              </RadioGroup>
              {reason === "other" && (
                <Textarea placeholder="Write your reason..." />
              )}
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button
                  variant="destructive"
                  disabled={!reason}
                  onClick={handleNext}
                >
                  Next
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="flex flex-col items-center justify-center py-6">
              {loading ? (
                <>
                  <div className="animate-spin h-8 w-8 border-4 border-red-500 border-t-transparent rounded-full mb-4"></div>
                  <p>Deleting your account... Please wait 15 seconds</p>
                </>
              ) : (
                <p>Done!</p>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
}
