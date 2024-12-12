import { Navigation } from '@/components/Navigation/Navigation.jsx'
import style from '@components/Header/Header.module.scss'
import { Link } from 'react-router-dom'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { MdFavoriteBorder } from 'react-icons/md'
import { useSelector } from 'react-redux'

export const Header = () => {
	const basket = useSelector(state => state.basket.basket)
	const favorites = useSelector(state => state.favorites.favorites)
	return (
		<div className={style.header}>
			<div className='container'>
				<div className={style.body}>
					<div className={style.logo}>
						<Link to='/main'>
							<img src='/src/assets/images/logo.svg' alt='Logo' />
						</Link>
					</div>
					<Navigation />
					<div className={style.buttons}>
						<Link to={'/favorites'} className={style.link}>
							<MdFavoriteBorder size={30} />
							{favorites.length > 0 && <span>{favorites.length}</span>}
						</Link>
						<Link
							to='/basket'
							className={style.link}
							// data-item-count={basket.length}
						>
							<AiOutlineShoppingCart size={30} />
							{basket.length > 0 && <span>{basket.length}</span>}
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}
