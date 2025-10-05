import { FC, useEffect } from 'react';
import { useAppContext } from '../hooks/useAppContext';

const LogoutPage: FC = () => {
    // Obtener logoUrl e isStandalone del contexto. Ya no se necesita navigate.
    const { logout, logoUrl, isStandalone } = useAppContext();

    useEffect(() => {
        // 1. Cerrar la sesión del usuario inmediatamente.
        logout();

        // 2. Después de 3 segundos, intentar cerrar la app si es una PWA instalada.
        const timer = setTimeout(() => {
            if (isStandalone) {
                window.close();
            }
            // Si no es una PWA, la página permanecerá aquí, sin redirigir.
        }, 3000);

        // 3. Limpiar el temporizador si el componente se desmonta.
        return () => clearTimeout(timer);
    }, [logout, isStandalone]); // Dependencias actualizadas.

    return (
        <div 
            className="relative min-h-screen flex flex-col items-center justify-between p-8 text-white text-center"
        >
            <div className="absolute inset-0 bg-black bg-opacity-70"></div>
            
            <header className="relative z-10 w-full">
                 <img src={logoUrl} alt="Logo de TELECOM" className="h-16 object-contain mx-auto" />
            </header>
            
            <main className="relative z-10 animate-fade-in-scale">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-500/20 mb-4">
                    <svg className="h-10 w-10 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <p className="text-xl text-gray-200 mb-6">Sesión cerrada correctamente.</p>
                
                <h1 className="text-4xl font-bold mb-4">GRACIAS POR UTILIZAR NUESTROS SERVICIOS</h1>
            </main>

            <footer className="relative z-10 w-full">
                 <p className="text-lg text-gray-300">Gerencia de Facilities & Servicios - Telecom Argentina S.A.</p>
            </footer>

            <style>{`
                @keyframes fade-in-scale {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
                .animate-fade-in-scale {
                    animation: fade-in-scale 1s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default LogoutPage;
