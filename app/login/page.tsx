import LoginForm from "@/app/components/LoginForm";

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-[400px] shadow-lg p-6 rounded-lg bg-white">
                <h1 className="text-2xl font-semibold mb-4 text-center">Login</h1>
                <LoginForm />
            </div>
        </div>
    );
}