import { Link, useParams } from 'react-router-dom'
import { AiOutlineArrowLeft, AiOutlineShoppingCart } from 'react-icons/ai'
import style from '@/pages/CardDetails/CardDetails.module.scss'
import { Modal } from '@/components/Modal/Modal.jsx'
import { Skeleton } from '@/components/Skeleton/Skeleton.jsx'
import { actions } from '@/store/basket/basket.slice.js'
import { modalActions } from '@/store/modal/modal.slice.js'
import { useDispatch, useSelector } from 'react-redux'

export const CardDetails = () => {
	const basket = useSelector(state => state.basket.basket)
	const { isOpen, message } = useSelector(state => state.modal)
	const dispatch = useDispatch()
	const { products, loading, error } = useSelector(state => state.products)

	const { id } = useParams()
	const product = products.find(prod => prod.id === parseInt(id))

	const isInBasket = basket.some(basketItem => basketItem.id === product.id)

	const handleAddToCart = () => {
		if (isInBasket) {
			dispatch(modalActions.modalActive('The product is already in your cart!'))
		} else {
			dispatch(actions.AddToBasket(product))
			dispatch(modalActions.modalActive('Product added!'))
		}
	}

	return (
		<div className={style.cardDetails}>
			{product ? (
				<div className={style.card}>
					<div className='container'>
						<div className={style.body}>
							<div className={style.main}>
								<div className={style.image}>
									{loading ? (
										<div className='loader-svg-wrap'>
											<Skeleton />
										</div>
									) : (
										<img src={product.image} alt={product.title} />
									)}
								</div>
								<div className={style.content}>
									<div className={style.top}>
										<h1 className={style.title}>{product.title}</h1>
										<div className={style.description}>{product.description}</div>
									</div>
									<div className={style.row}>
										<div className={style.column}>
											<p className={style.price}>$ {product.price}</p>
										</div>
										<div className={style.column}>
											<button
												className={`${style.button} ${isInBasket ? style.inBasket : ''}`}
												onClick={handleAddToCart}>
												<AiOutlineShoppingCart size='20' />
												{isInBasket ? 'In Basket' : 'Add to cart'}
											</button>
										</div>
									</div>
								</div>
							</div>
							<Link to='/products' className={style.link}>
								<AiOutlineArrowLeft size={20} />
								Back to shopping
							</Link>
						</div>
					</div>
					<Modal active={isOpen} message={message} />
				</div>
			) : (
				<div className={style['not-found']}>Card not found!</div>
			)}
		</div>
	)
}
