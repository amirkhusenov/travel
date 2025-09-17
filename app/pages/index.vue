<script setup lang = 'ts'>
    import { onMounted } from 'vue'
    import { createTimeline, stagger, text } from 'animejs'
    import Button from '~/components/ui/button/Button.vue';

    definePageMeta({
        layout: 'main'
    })

    onMounted(() => {
        const animateText = (selector: string) => {
            const { words, chars } = text.split(selector, {
                words: { wrap: 'clip' },
                chars: true,
            });

            createTimeline({
                loop: false,
                defaults: { ease: 'inOut(3)', duration: 650 }
            })
            .add(selector, {
                opacity: [0, 1],
                duration: 1,
                ease: 'linear'
            })
            .add(words, {
                y: [(target: any) => +((target as HTMLElement).dataset?.line ?? 0) % 2 ? '100%' : '-100%', '0%'],
            }, stagger(125))
            .add(chars, {
                y: [(target: any) => +((target as HTMLElement).dataset?.line ?? 0) % 2 ? '100%' : '-100%', '0%'],
            }, stagger(10, { from: 'random' }))
            .init();
        };
        animateText('.hero__title');
        animateText('.description');
    })
</script>

<template>
    <div class="wrapper">
        <div class="wrapper__overlay">
            <div class="container-custom">
                <header class="header">
                    <nav class="nav">
                        <a href="/" class="logo title">
                            <img src="/logo.svg" alt=""> 
                            <span>Traveling</span>
                        </a>
                        <Button variant="default" class="cta">
                            <a href="#">Начать</a>
                        </Button>
                    </nav>
                </header>
                <section class="hero">
                    <h1 class="hero__title title">Откройте магию мира: ваше незабываемое приключение ждёт</h1>
                    <p class="description">От захватывающих пейзажей до ярких культур — откройте для себя красоту, историю и кухню, как никогда раньше.</p>
                </section>
            </div>
        </div>
    </div>
    <main class="main">
        <section class="about-us container-custom">
            <div class="badge">О нас</div>
            <h2 class="about-us__title title">Ваш проводник в подлинные<br/>приключения по всему миру</h2>
            <p class="about-us__desc">
                Мы стремимся помочь вам ощутить настоящий дух и характер каждой страны. Обладая глубокими местными знаниями и страстью к приключениям, мы создаем незабываемые путешествия — от безмятежных пляжей и оживленных городских рынков до древних исторических мест и скрытых троп в джунглях. Вы путешествуете впервые или являетесь опытным исследователем, наша миссия — сделать ваше путешествие подлинным,и по-настоящему запоминающимся.
            </p>
            <Button class="about-us__cta">
                <span>Начать</span>
            </Button>
        </section>
        <section class="destinations container-custom">
            <div class="badge">Наши направления</div>
            <div class="destinations-text">
                <h2 class="about-us__title title">Исследуйте уникальные направления</h2>
                <p class="about-us__desc">
                    Мы стремимся помочь вам ощутить настоящий дух и характер каждой страны. Обладая глубокими местными знаниями и страстью к приключениям, мы создаем незабываемые путешествия — от безмятежных пляжей и оживленных городских рынков до древних исторических мест и скрытых троп в джунглях. Вы путешествуете впервые или являетесь опытным исследователем, наша миссия — сделать ваше путешествие подлинным,и по-настоящему запоминающимся.
                </p>
            </div>
            <div class="carousel">
                <article class="travel-card">
                    <NuxtImg class="travel-card__image" src="./card-1.jpg" densities="x1" format="webp"/>
                    <div class="travel-card__badge">4 дня, 3 ночи</div>

                    <div class="travel-card__overlay">
                        <h3 class="travel-card__title">Чиангмай</h3>
                        <p class="travel-card__desc">
                            Откройте для себя древние храмы, оживленные ночные рынки и пышные горные пейзажи. Чиангмай, расположенный у подножия гор северного Таиланда, предлагает идеальное сочетание традиций и спокойствия.
                        </p>
                        <div class="travel-card__footer">
                            <Button class="cta">
                            <span>Начать</span>
                            </Button>
                        </div>
                    </div>
                </article>
                <article class="travel-card">
                    <NuxtImg class="travel-card__image" src="./card-2.jpg" densities="x1" format="webp"/>
                    <div class="travel-card__badge">4 дня, 3 ночи</div>

                    <div class="travel-card__overlay">
                        <h3 class="travel-card__title">Сингапур</h3>
                        <p class="travel-card__desc">
                            Откройте для себя ультрасовременный мегаполис, где небоскрёбы соседствуют с зелёными садами и культурными кварталами. Сингапур удивляет своим разнообразием — от знаменитых садов у залива и панорамного колеса до уютных уличных рынков и кулинарных шедевров.</p>
                        <div class="travel-card__footer">
                            <Button href="#" class="cta">
                            <span>Начать</span>
                        </Button>
                        </div>
                    </div>
                </article>
                <article class="travel-card">
                    <NuxtImg class="travel-card__image" src="./card-3.jpg" densities="x1" format="webp"/>
                    <div class="travel-card__badge">4 дня, 3 ночи</div>

                    <div class="travel-card__overlay">
                        <h3 class="travel-card__title">Таиланд</h3>
                        <p class="travel-card__desc">
                            Погрузитесь в атмосферу Страны Улыбок, где золотые храмы, райские пляжи и яркие рынки создают незабываемый колорит. Таиланд — это гармония природы и культуры: от шумного Бангкока до спокойных островов Андаманского моря.</p>
                        <div class="travel-card__footer">
                            <Button href="#" class="cta">
                            <span>Начать</span>
                        </Button>
                        </div>
                    </div>
                </article>
                <article class="travel-card">
                    <NuxtImg class="travel-card__image" src="./card-1.jpg" densities="x1" format="webp"/>
                    <div class="travel-card__badge">4 дня, 3 ночи</div>

                    <div class="travel-card__overlay">
                        <h3 class="travel-card__title">Чиангмай</h3>
                        <p class="travel-card__desc">
                            Откройте для себя древние храмы, оживленные ночные рынки и пышные горные пейзажи. Чиангмай, расположенный у подножия гор северного Таиланда, предлагает идеальное сочетание традиций и спокойствия.
                        </p>
                        <div class="travel-card__footer">
                            <Button href="#" class="cta">
                            <span>Начать</span>
                        </Button>
                        </div>
                    </div>
                </article>
                <article class="travel-card">
                    <NuxtImg class="travel-card__image" src="./card-2.jpg" densities="x1" format="webp"/>
                    <div class="travel-card__badge">4 дня, 3 ночи</div>

                    <div class="travel-card__overlay">
                        <h3 class="travel-card__title">Сингапур</h3>
                        <p class="travel-card__desc">
                            Откройте для себя ультрасовременный мегаполис, где небоскрёбы соседствуют с зелёными садами и культурными кварталами. Сингапур удивляет своим разнообразием — от знаменитых садов у залива и панорамного колеса до уютных уличных рынков и кулинарных шедевров.</p>
                        <div class="travel-card__footer">
                            <Button href="#" class="cta">
                            <span>Начать</span>
                        </Button>
                        </div>
                    </div>
                </article>
                <article class="travel-card">
                    <NuxtImg class="travel-card__image" src="./card-3.jpg" densities="x1" format="webp"/>
                    <div class="travel-card__badge">4 дня, 3 ночи</div>

                    <div class="travel-card__overlay">
                        <h3 class="travel-card__title">Таиланд</h3>
                        <p class="travel-card__desc">
                            Погрузитесь в атмосферу Страны Улыбок, где золотые храмы, райские пляжи и яркие рынки создают незабываемый колорит. Таиланд — это гармония природы и культуры: от шумного Бангкока до спокойных островов Андаманского моря.</p>
                        <div class="travel-card__footer">
                            <Button href="#" class="cta">
                            <span>Начать</span>
                        </Button>
                        </div>
                    </div>
                </article>
                <article class="travel-card">
                    <NuxtImg class="travel-card__image" src="./card-1.jpg" densities="x1" format="webp"/>
                    <div class="travel-card__badge">4 дня, 3 ночи</div>

                    <div class="travel-card__overlay">
                        <h3 class="travel-card__title">Чиангмай</h3>
                        <p class="travel-card__desc">
                            Откройте для себя древние храмы, оживленные ночные рынки и пышные горные пейзажи. Чиангмай, расположенный у подножия гор северного Таиланда, предлагает идеальное сочетание традиций и спокойствия.
                        </p>
                        <div class="travel-card__footer">
                            <Button href="#" class="cta">
                            <span>Начать</span>
                        </Button>
                        </div>
                    </div>
                </article>
                <article class="travel-card">
                    <NuxtImg class="travel-card__image" src="./card-2.jpg" densities="x1" format="webp"/>
                    <div class="travel-card__badge">4 дня, 3 ночи</div>

                    <div class="travel-card__overlay">
                        <h3 class="travel-card__title">Сингапур</h3>
                        <p class="travel-card__desc">
                            Откройте для себя ультрасовременный мегаполис, где небоскрёбы соседствуют с зелёными садами и культурными кварталами. Сингапур удивляет своим разнообразием — от знаменитых садов у залива и панорамного колеса до уютных уличных рынков и кулинарных шедевров.</p>
                        <div class="travel-card__footer">
                            <Button href="#" class="cta">
                            <span>Начать</span>
                        </Button>
                        </div>
                    </div>
                </article>
                <article class="travel-card">
                    <NuxtImg class="travel-card__image" src="./card-3.jpg" densities="x1" format="webp"/>
                    <div class="travel-card__badge">4 дня, 3 ночи</div>

                    <div class="travel-card__overlay">
                        <h3 class="travel-card__title">Таиланд</h3>
                        <p class="travel-card__desc">
                            Погрузитесь в атмосферу Страны Улыбок, где золотые храмы, райские пляжи и яркие рынки создают незабываемый колорит. Таиланд — это гармония природы и культуры: от шумного Бангкока до спокойных островов Андаманского моря.</p>
                        <div class="travel-card__footer">
                            <Button href="#" class="cta">
                            <span>Начать</span>
                        </Button>
                        </div>
                    </div>
                </article>
            </div>
        </section>
        <section class="faq container-custom">
            <div class="faq__left">
                <div class="badge">FAQ</div>
                <h2 class="about-us__title title">Все, что вам нужно знать перед поездкой</h2>
                <p class="about-us__desc">
                    Мы собрали ответы на самые частые вопросы, чтобы вы могли отправиться в путь с уверенностью. От требований к визам и местных традиций до советов по сбору чемодана и правил безопасности — здесь есть вся необходимая информация.</p>
            </div>
            <div class="faq__right">        
            <ul class="faq__list">
                <li class="faq__item">
                    <details class="faq__details">
                        <summary class="faq__question">
                            Нужна ли виза для поездки за границу?
                            <span class="faq__question-icon"></span>
                        </summary>
                        <div class="faq__answer">
                            <p>Это зависит от страны назначения и вашего гражданства. Часто можно путешествовать без визы на короткий срок, но перед поездкой лучше уточнить правила въезда.</p>
                        </div>
                    </details>
                </li>
                
                <li class="faq__item">
                    <details class="faq__details">
                        <summary class="faq__question">
                            Когда лучше всего путешествовать?
                            <span class="faq__question-icon"></span>
                        </summary>
                        <div class="faq__answer">
                            <p>Оптимальное время зависит от климата страны. В целом удобнее всего ехать в сухой сезон или когда погода мягкая и комфортная.</p>
                        </div>
                    </details>
                </li>
                
                <li class="faq__item">
                    <details class="faq__details">
                        <summary class="faq__question">
                            Безопасно ли путешествовать?
                            <span class="faq__question-icon"></span>
                        </summary>
                        <div class="faq__answer">
                            <p>Большинство стран безопасны для туристов, если соблюдать базовые меры предосторожности: беречь документы, не оставлять вещи без присмотра и уважать местные законы.</p>
                        </div>
                    </details>
                </li>
                
                <li class="faq__item">
                    <details class="faq__details">
                        <summary class="faq__question">
                            Какая валюта используется и можно ли платить картой?
                            <span class="faq__question-icon"></span>
                        </summary>
                        <div class="faq__answer">
                            <p>В каждой стране своя валюта. Банковские карты обычно принимают в отелях и крупных магазинах, но для мелких расходов лучше иметь наличные.</p>
                        </div>
                    </details>
                </li>
            </ul>
            </div>
        </section>
        <section class="reviews container-custom">
            <div class="badge">Отзывы</div>
            <p class="reviews-text">"С самого начала поездки и до её завершения всё прошло легко и незабываемо. Экскурсии были прекрасно организованы, гиды — внимательные и знающие. Это путешествие превзошло все ожидания — не можем дождаться следующего приключения!"</p>
            <div class="reviews__photos">
                <NuxtImg class="reviews__photos-item reviews__photos-item--mobile" src="./review-1.avif" densities="x1" format="webp"/>
                <NuxtImg class="reviews__photos-item reviews__photos-item--active" src="./review-2.avif" densities="x1" format="webp"/>
                <NuxtImg class="reviews__photos-item reviews__photos-item--mobile" src="./review-3.avif" densities="x1" format="webp"/>
            </div>
            <div class="reviews__footer">
                <p class="reviews__footer-title">Ольга Н.</p>
                <p class="reviews__footer-text">Россия</p>
            </div>
        </section>
    </main>
    <footer class="footer">
        <div class="footer_container container-custom">
            <div class="footer__container-left">
                <h2 class="footer__title title">
                    Предавайся своему любимому занятию — путешествиям. <br>
                    <span>Мы возьмем все хлопоты на себя.</span>
                </h2>
                <Button class="btn">
                    <a href="#">Начать</a>
                </Button>
            </div>
            <div class="footer__container-right">
                <a href="/" class="logo title">
                    <img src="/logo.svg" alt=""> 
                    <span>Traveling</span>
                </a>
                <p class="footer__desc">От древних храмов до белоснежных пляжей —
                открой для себя безграничную красоту, богатую культуру
                и неповторимую кухню наших направлений.</p>
            </div>
        </div>
    </footer>
</template>

<style scoped lang='scss'>
.wrapper {
    position: relative;
    max-height: 70vh;
    width: 100%;
    background: url('~/assets/img/test.jpeg');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
}
.wrapper__overlay {
    height: 70vh;
    width: 100%;
    background-color: #00000060;
}
.header {
    padding-top: 40px;
}
.nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.logo {
    display: flex;
    align-items: center;
    gap: 5px;
    color: white;
    text-decoration: none;
    img {
        width: 40px;
        height: 40px;
    }
    span {
        font-size: 40px;
        font-weight: 600;
    }
}
.main {
    color: #000;
}
.hero {
    margin-top: 120px;
    width: 50%;
}
.description {
    opacity: 0;
    color: #c7c7c7;
}
.hero__title {
    font-size: 64px;
    font-weight: 600;
}
.description  {
    font-size: 24px;
    opacity: 0.8; 
    font-weight: 300;
    margin-top: 20px;
    line-height: 1.2;
}
.badge{
    border-radius: 20px;
    border: 1px solid #cecece;
    padding: 5px 20px;
    width: fit-content;
}
.about-us {
    margin-top: 20px;
    color: #000;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align: center;

    &__title {
        font-size: 48px;
        font-weight: 600;
        line-height: 0.9;
    }
    &__desc {
        margin-top: 20px;
        font-size: 18px;
        line-height: 1.2;
        width: 60%;
    }
    &__cta {
        margin-top: 20px;
        background: #000;
        color: white;
        font-weight: 500;
        text-decoration: none;
    }
}
.destinations-text {
    margin-top: 20px;
    display: grid;
    grid-template-columns: 1.2fr 1fr;

    .about-us__desc {
        width: 100%;
    }
    .about-us__desc {
        margin-top: 0;
    }

}
.carousel {
    width: 100%;
    overflow-x: auto;
    margin: 20px auto;
    display: flex;
    gap: 1em;
    scroll-behavior: smooth;
    anchor-name: --carousel;
    scroll-snap-type: x mandatory;
}
.carousel::-webkit-scrollbar {
    display: none;
}
.carousel::scroll-button(right),
.carousel::scroll-button(left) {
    border: none;   
    background-color: transparent;
    border-radius: 50%;
    border: 1px solid #000;
    width: 50px;
    height: 50px;
    padding-bottom: .1em;
    font-size: 30px;
    cursor: pointer;
    position: fixed;
    position-anchor: --carousel;
    margin-top: 20px;
}
.carousel::scroll-button(right):disabled,
.carousel::scroll-button(left):disabled {
    background-color: #000;
    color: #fff;
    cursor: auto;
} 
.carousel::scroll-button(right) {
    position-area: bottom;
    translate: 60%;
    content: '→';
}
.carousel::scroll-button(left) {
    position-area: bottom;
    translate: -60%;
    content: '←';
}
.travel-card {
    scroll-snap-align: start;
      flex: 0 0 30em;
      border-radius: 16px;
      overflow: hidden;
      position: relative;
      box-shadow: 0 10px 30px rgba(0,0,0,0.15);
      background: #000;
    }

    .travel-card__image {
      width: 100%;
      height: 260px;
      object-fit: cover;
      display: block;
    }

    .travel-card__badge {
      position: absolute;
      top: 14px;
      right: 14px;
      background: rgba(0,0,0,0.5);
      color: #fff;
      font-size: 13px;
      padding: 6px 12px;
      border-radius: 20px;
    }

    .travel-card__overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.6) 70%);
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      padding: 20px;
      gap: 10px;
    }

    .travel-card__title {
      margin: 0;
      font-size: 20px;
      font-weight: bold;
      color: #fff;
    }

    .travel-card__desc {
      margin: 0;
      font-size: 13px;
      line-height: 1.2;
      color: white;
      overflow: hidden;
    }

    .travel-card__footer {
      display: flex;
      align-items: center;
      margin-top: 8px;

      .cta span {
        padding: 2px 10px;
      }
    }
    @media(max-width: 550px) {
        .travel-card {
            flex: 0 0 100%;
            aspect-ratio: 5/3;
        }
    }
    @media (max-width: 480px) {
      .travel-card {
        width: 96vw;
      }
      .travel-card__title {
        font-size: 18px;
      }
    }
    .faq {
        display: grid;
        grid-template-columns: 1.5fr 1fr;

        .about-us__title {
            margin-top: 20px;
        }
    }
    .faq__list {
        list-style: none;
        display: flex;
        flex-direction: column;
        gap: 15px;
    }
    
    .faq__item {
        border: 1px solid #eaeaea;
    }
    
    .faq__question {
        display: block;
        width: 100%;
        padding: 20px 0 20px 10px;
        cursor: pointer;
        position: relative;
        font-size: 18px;
        font-weight: 500;
        background: none;
        border: none;
        text-align: left;
        transition: all 0.3s;
    }
    
    .faq__question::-webkit-details-marker {
        display: none;
    }
    
    .faq__question-icon {
        position: absolute;
        right: 20px;
        top: 50%;
        transform: translateY(-50%);
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #000;
        font-size: 20px;
        font-weight: bold;
        transition: transform 0.3s;
    }
    
    .faq__details[open] .faq__question-icon::after {
        content: '−';
    }
    
    .faq__question-icon::after {
        content: '+';
    }
    
    .faq__answer {
        padding: 10px 10px;
        color: #555;
        line-height: 1.6;
    }
    
    @media (max-width: 600px) {
        .faq__header {
            padding: 20px;
        }
        
        .faq__question {
            padding: 15px 50px 15px 15px;
        }
        
        .faq__answer {
            padding: 0 15px 15px;
        }
        
        .faq__question-icon {
            right: 20px;
        }
    }
    .reviews {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        text-align: center;
    }
    .reviews-text {
        margin-top: 20px;
        font-size: 36px;
        font-weight: 600;
    }
    .reviews__photos {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 20px;
        margin-top: 20px;
    }
    .reviews__photos-item {
        width: 150px;
        height: 150px;
        object-fit: cover;
        border-radius: 20px;
    }
    .reviews__photos-item--active {
        width: 175px;
        height: 175px;
    }
    .reviews__footer {
        margin-top: 10px;
    }
    .reviews__footer-title {
        font-size: 24px;
        font-weight: 600;
    }
    .reviews__footer-text {
        font-size: 16px;
        color: #C9C9C9;
    }
    .footer {
        background-color: #000;
        padding: 50px 0;
    }
    .footer_container {
        display: grid;
        grid-template-columns: 4fr 1fr;        
    }
    .footer__container-left {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
    .btn {
        width: fit-content;
    }
    .footer__title {
        font-size: 48px;
        font-weight: 600;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    .footer__title span {
        color: #5b5b5b;
    }
    .footer__container-right {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
    .footer__desc {
        line-height: 1.3;
        text-align: justify;
    }

    @media (max-width: 1440px) {
        .hero {
            margin-top: 60px;
        }
        .hero__title {
            font-size: 48px;
        }
        .description {
            font-size: 16px;
        }
    }
    @media (max-width: 1200px) {
        .hero {
            width: 100%;
        }
        .destinations-text {
            grid-template-columns: 1fr;
            row-gap: 20px;
        }
        .container-custom {
            padding: 0 0 20px 0;
        }
        .faq {
            grid-template-columns: 1fr;
            gap: 10px;
            margin-top: 20px;
        }
        .faq__list {
            gap: 5px;
        }
        .faq__question {
            font-size: 16px;
        }
        .footer_container {
            grid-template-columns: 1fr;
            row-gap: 20px;
        }
        .footer__container-right {
            display: none;
        }
    }
    @media (max-width: 480px) {
        .wrapper {
            height: 60vh;
        }
        .wrapper__overlay {
            height: 60vh;
        }
        .hero {
            margin-top: 20px;
        }
        .hero__title {
            font-size: 36px;
        }
        .description {
            font-size: 16px;
        }
        .about-us {
            align-items: start;
            text-align: left;
            &__title {
                margin-top: 20px;
                font-size: 24px;
            }
            &__desc {
                width: 100%;
                font-size: 16px;
            }
        }
        .destinations-text {
            margin-top: 0;
        }
        .footer__title {
            font-size: 24px;
        }
        .reviews-text {
            font-size: 24px;
        }
        .reviews__photos-item--mobile {
            display: none;
        }
        .reviews__photos-item--active {
            width: 125px;
            height: 125px;
        }
        .reviews__footer-title {
            font-size: 18px;
        }
        .footer {
            padding: 20px 0;
        }
    }
</style>
