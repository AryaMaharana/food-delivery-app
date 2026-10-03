import {useEffect,useState} from 'react';
import {Link} from 'react-router-dom';
import {restaurants} from '../services/api';

const heroFoods = [
  {name:'Biryani', image:'https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?auto=format&fit=crop&fm=jpg&q=88&w=1000'},
  {name:'Desi Thali', image:'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&fm=jpg&q=88&w=1000'},
  {name:'Dal Tadka', image:'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&fm=jpg&q=88&w=1000'},
  {name:'Noodles', image:'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&fm=jpg&q=88&w=1000'},
  {name:'Pizza', image:'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&fm=jpg&q=88&w=1000'},
];

const foodFloaters = [
  {emoji:'🍕', className:'food-f1'},
  {emoji:'🍜', className:'food-f2'},
  {emoji:'🥟', className:'food-f3'},
  {emoji:'🍔', className:'food-f4'},
  {emoji:'🥗', className:'food-f5'},
  {emoji:'🍰', className:'food-f6'},
];

export default function Home(){
  const [data,setData]=useState([]);
  const [heroFood,setHeroFood]=useState(0);
  useEffect(()=>{restaurants().then(r=>setData(r.data)).catch(()=>setData([]))},[]);
  useEffect(()=>{
    const timer=setInterval(()=>setHeroFood(i=>(i+1)%heroFoods.length),3000);
    return ()=>clearInterval(timer);
  },[]);

  return <main className="home">
    <section className="hero">
      <div className="aurora aurora-one"></div>
      <div className="aurora aurora-two"></div>
      <div className="aurora aurora-three"></div>
      <div className="grain"></div>
      <div className="orb orb-one"></div>
      <div className="orb orb-two"></div>
      {foodFloaters.map((f,i)=><span key={i} className={`food-floater ${f.className}`}>{f.emoji}</span>)}

      <div className="heroCopy">
        <div className="heroBadge"><span className="pulseDot"></span> Pune's food scene, delivered</div>
        <h1>Good food.<br/><span>Good mood.</span><br/>On repeat.</h1>
        <p>From late-night cravings to comfort-food classics, discover something delicious and get it at your door.</p>
        <div className="heroActions">
          <Link className="heroBtn magnetic" to="#restaurants">Explore food <span>↗</span></Link>
          <a className="scrollHint" href="#restaurants"><span className="mouseIcon"></span> Scroll to discover</a>
        </div>
        <div className="heroStats">
          <div><strong>4.8<span>★</span></strong><small>average rating</small></div>
          <div><strong>30<span>+</span></strong><small>local favourites</small></div>
          <div><strong>25<span>m</span></strong><small>average delivery</small></div>
        </div>
      </div>

      <div className="heroVisual">
        <div className="visualGlow"></div>
        <div className="plateRing ring-one"></div>
        <div className="plateRing ring-two"></div>
        <div className="heroPlate">
          <div className="plateInner">
            <img key={heroFoods[heroFood].name} src={heroFoods[heroFood].image} alt={heroFoods[heroFood].name} />
            <div className="foodCategoryLabel"><span>Today's craving</span><b>{heroFoods[heroFood].name}</b></div>
          </div>
        </div>
        <div className="chefBadge"><span className="chefAvatar">👨‍🍳</span><div><b>Made with love</b><small>by our local chefs</small></div></div>
        <div className="foodDots" aria-label="Food categories">{heroFoods.map((food,i)=><button key={food.name} className={i===heroFood?'active':''} onClick={()=>setHeroFood(i)} aria-label={`Show ${food.name}`}></button>)}</div>
        <div className="floatingCard ratingCard"><span>★</span><div><b>4.9</b><small>loved today</small></div></div>
        <div className="floatingCard deliveryCard"><span>⚡</span><div><b>25 min</b><small>at your door</small></div></div>
        <div className="floatingCard freshCard"><span>🔥</span><div><b>Fresh picks</b><small>near you</small></div></div>
        <div className="greenFoodCard">
          <img src="https://images.unsplash.com/photo-1505576733088-f8a0f2f4b8a7?auto=format&fit=crop&fm=jpg&q=82&w=600" alt="Fresh green salad" />
          <div><b>Fresh & green</b><small>healthy favourites</small></div>
        </div>
      </div>
      <div className="heroMarquee"><div><span>FRESHLY MADE</span><i>✦</i><span>LOCAL FAVOURITES</span><i>✦</i><span>FAST DELIVERY</span><i>✦</i><span>FRESHLY MADE</span><i>✦</i><span>LOCAL FAVOURITES</span><i>✦</i></div></div>
    </section>

    <section id="restaurants" className="restaurantsSection">
      <div className="sectionHead">
        <div><span className="eyebrow">CURATED FOR YOU</span><h2>What are you<br/><em>hungry for?</em></h2></div>
        <span className="count">{data.length} places to explore <b>↘</b></span>
      </div>
      <div className="grid">
        {data.map((r,i)=><Link className="restaurantCard" to={`/restaurant/${r.id}`} key={r.id}>
          <div className="photo"><img src={r.imageUrl} alt={r.name}/><span>20–30 min</span><div className="cardNumber">0{i+1}</div></div>
          <div className="restaurantInfo"><div className="cardTop"><h3>{r.name}</h3><b>↗</b></div><p>{r.description}</p><small>● {r.address} · Indian</small></div>
        </Link>)}
      </div>
    </section>
  </main>
}