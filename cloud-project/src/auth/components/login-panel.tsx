import { Card, CardContent } from "@/src/shared/ui/card";
import { LoginForm } from "./login-form";

export function LoginPanel() {
  return (
    <Card className="flex items-center justify-center rounded-none border-0 bg-white py-10 shadow-none sm:py-12 lg:px-14">
      <CardContent className="w-full max-w-md px-6 sm:px-12 lg:px-0">
        <div className="mb-10 lg:hidden">
          <div className="flex items-center gap-3">
            <span className="text-lg font-semibold tracking-wide">cloud</span>
          </div>
        </div>
        <LoginForm />
      </CardContent>
    </Card>
  );
}
