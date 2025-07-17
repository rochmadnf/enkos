import { Input } from '@/components/input';
import { InputErrorMessage } from '@/components/input-error-message';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';
import { type SharedData } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function Login() {
    const {app: {office_name: officeName}} = usePage<SharedData>().props;
    const form = useForm<{
        username: string;
        password: string;
    }>({
        username: '',
        password: '',
    });

    const hitLoginButton: FormEventHandler = (e) => {
        e.preventDefault();

        form.post(route('login'), {
            onFinish: () => form.reset('password'),
        });
    };

    return (
        <AuthLayout title="Log in" description="Silakan masukkan kredensial untuk melanjutkan.">
            <Head title="Log in"></Head>

            <form onSubmit={hitLoginButton} className="space-y-6">
                <div>
                    <Label htmlFor="username">Nama Pengguna</Label>
                    <Input
                        id="username"
                        type="text"
                        name="username"
                        isize="md"
                        className="mt-2.5"
                        value={form.data.username}
                        autoComplete="username"
                        autoFocus
                        onChange={(e) => form.setData('username', e.target.value)}
                    />
                    <InputErrorMessage message={form.errors.username} className="mt-2" />
                </div>

                <div>
                    <Label htmlFor="password">Kata Sandi</Label>
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        isize="md"
                        className="mt-2.5"
                        value={form.data.password}
                        autoComplete="current-password"
                        onChange={(e) => form.setData('password', e.target.value)}
                    />
                    <InputErrorMessage message={form.errors.password} className={'mt-2'} />
                </div>

                <div className="flex items-center justify-between">
                    <Button size="full" disabled={form.processing}>
                        Masuk
                    </Button>
                </div>
            </form>
            <p className="mt-5 text-center text-xs text-slate-900/75">&copy; Since 2025 {officeName}. All Right Reserved.</p>
        </AuthLayout>
    );
}
