import { Link } from 'react-router-dom';
import logo from '../../assets/freshcart-logo.svg';
import { useContext } from 'react';
import { authContext } from '../../context/Auth/Auth';

export default function Footer() {
  const { userToken } = useContext(authContext);

  return (
    <>
      <footer className="bg-white border border-t-1 mt-6 dark:bg-gray-900">
        <div className=" p-6 mx-auto">
          <div className="lg:flex">
            <div className="w-full -mx-6 lg:w-2/5">
              <div className="px-6">
                <a href="#">
                  <img className="h-8" src={logo} alt="Site Logo" />
                </a>
                <div className="max-w-sm mt-2 text-gray-500 dark:text-gray-400">
                 Descubre los mejores productos saludables en un solo lugar!
                </div>
              </div>
            </div>
            <div className="mt-6 lg:mt-0 lg:flex-1">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
                <div>
                  <h3 className="text-gray-700 uppercase dark:text-white">
                    Ir
                  </h3>
                  {userToken ? (
                    <>
                      <Link
                        to="/"
                        className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline"
                      >
                        <i className="fa-fw  fas fa-home"></i> Inicio
                      </Link>
                      <Link
                        to="/wishlist"
                        className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline"
                      >
                        <i className="fa-fw  fas fa-heart"></i> Favoritos
                      </Link>
                      <Link
                        to="/cart"
                        className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline"
                      >
                        <i className="fa-fw  fas fa-shopping-cart"></i> Carrito
                      </Link>
                      <Link
                        to="/brands"
                        className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline"
                      >
                        <i className="fa-fw  fas fas fa-tags"></i> Marcas
                      </Link>
                      <Link
                        to="/categories"
                        className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline"
                      >
                        <i className="fa-fw  fas fa-list"></i> Categorias
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        to="login"
                        className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline"
                      >
                        <i className="fas fa-sign-in-alt"></i> Iniciar sesion
                      </Link>
                      <Link
                        to="register"
                        className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline"
                      >
                        <i className="fas fa-user-plus fa-fw"></i> Registrarse
                      </Link>
                    </>
                  )}
                </div>
                <div>
                  <h3 className="text-gray-700 uppercase dark:text-white">
                    Contact
                  </h3>
                  <span className="block mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline">
                    <a href="mailto:mohamed.ahmed.emary@gmail.com">
                      tiendaSaludable@gmail.com
                    </a>
                  </span>
                  <span className="block space-x-2 mt-2 text-sm text-gray-600 dark:text-gray-400 hover:underline">
                    <a
                      href="https://linkedin.com/in/tiendaSaludable"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fa-lg fa-fw  fab fa-linkedin"></i>
                    </a>
                    <a
                      href="https://github.com/dggtn"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fa-lg fa-fw  fab fa-github"></i>
                    </a>
                    <a
                      href="tiendaSalludable@gmail.com"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fa-lg fa-fw  far fa-envelope"></i>
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
