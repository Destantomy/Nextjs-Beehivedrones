import SignupForm from "@/app/components/SignupForm";

export default function SignupPage() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-[400px] shadow-lg p-6 rounded-lg bg-white">
                <h1 className="text-2xl font-semibold mb-4 text-center">Create Account</h1>
                <SignupForm />
            </div>
        </div>
    );
}
