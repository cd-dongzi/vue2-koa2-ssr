<template>
    <div>
        <img :src="require('assets/404.png')" class="not-found animated swing hinge" alt="404">
        <button @click="$router.push('/')">返回首页</button>
    </div>
</template>
<style>
    .not-found {
        display: block;
        margin: 0 auto;
        margin-top: 100px;
    }
    button {
        width: 120px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        display: block;
        margin: 50px auto;
    }
    .animated.hinge {
        animation-duration: 2s;
    }
    .hinge {
        animation-name: hinge;
    }
    .swing {
        transform-origin: top center;
        animation-name: swing;
    }
    .animated {
        animation-duration: 1s;
        animation-fill-mode: both;
    }

    @keyframes hinge {
      0% {
        transform-origin: top left;
        animation-timing-function: ease-in-out;
      }

      20%, 60% {
        transform: rotate3d(0, 0, 1, 80deg);
        transform-origin: top left;
        animation-timing-function: ease-in-out;
      }

      40%, 80% {
        transform: rotate3d(0, 0, 1, 60deg);
        transform-origin: top left;
        animation-timing-function: ease-in-out;
        opacity: 1;
      }

      to {
        transform: translate3d(0, 700px, 0);
        opacity: 0;
      }
    }

    @keyframes swing {
      20% {
        transform: rotate3d(0, 0, 1, 15deg);
      }

      40% {
        transform: rotate3d(0, 0, 1, -10deg);
      }

      60% {
        transform: rotate3d(0, 0, 1, 5deg);
      }

      80% {
        transform: rotate3d(0, 0, 1, -5deg);
      }

      to {
        transform: rotate3d(0, 0, 1, 0deg);
      }
    }
</style>