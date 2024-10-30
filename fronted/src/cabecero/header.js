import { Favoritos } from '../components/favoritos/Favoritos'
import { login } from '../components/login/login'
import { Mangas } from '../components/Mangas/manga'
import { register } from '../components/register/register'
import './header.css'

const routes = [
  {
    texto: 'Manga',
    funcion: Mangas
  },
  {
    texto: 'Login',
    funcion: login
  },
  {
    texto: 'Register',
    funcion: register
  },
  {
    texto: 'Favoritos',
    funcion: Favoritos
  }
]

export const Header = () => {
  const header = document.querySelector('header')
  header.innerHTML = ''
  const nav = document.createElement('nav')
  const img = document.createElement('img')
  img.src =
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKk9PbVrTqKKwAEacqg4CPoDKqqpmt7eDCwQ&s'
  for (const route of routes) {
    if (route.texto === 'Register' && localStorage.getItem('token')) continue // Oculta el botón de registro si el usuario ya ha iniciado sesión

    const a = document.createElement('a')
    a.href = '#'

    if (route.texto === 'Login' && localStorage.getItem('token')) {
      a.textContent = 'Logout'
      a.addEventListener('click', () => {
        localStorage.clear()
        Mangas()
        Header()
      })
    } else {
      if (!localStorage.getItem('token') && route.texto === 'Favoritos') {
        // Si no hay token, no muestra el enlace de Favoritos
      } else {
        a.textContent = route.texto
        a.addEventListener('click', route.funcion)
      }
    }

    nav.append(a)
  }
  header.append(img)
  header.append(nav)
}
