import LoginButton from "@/components/button/login-button";
import ChatInput from "@/components/chat-input";

export default function Home() {
  return (
    <div className="flex flex-col gap-10 min-h-screen items-center justify-center">
      <ChatInput />
      <LoginButton />
    </div>
  );
}
