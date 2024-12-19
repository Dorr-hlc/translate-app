## 一 前言

本章节将详细介绍一下 state ，题目叫做玄学 state ，为什么说玄学 state 呢，因为在不同的执行环境下，或者不同的 React 模式下，State 更新流程都是不同的。

为了证实上面的话，首先翻出一道老掉牙的面试题：**state 到底是同步还是异步的？**

如果对 React 底层有一定了解，回答出 batchUpdate 批量更新概念，以及批量更新被打破的条件。似乎已经达到了面试官的要求，但是这里想说的是，这个答案在不久的将来有可能被颠覆。

为什么这么说呢？

 React 是有多种模式的，基本平时用的都是 legacy 模式下的 React，除了 `legacy` 模式，还有 `blocking` 模式和 `concurrent` 模式， blocking 可以视为 concurrent 的优雅降级版本和过渡版本，React 最终目的，不久的未来将以 concurrent 模式作为默认版本，这个模式下会开启一些新功能。

对于 concurrent 模式下，会采用不同 State 更新逻辑。前不久透露出未来的Reactv18 版本，concurrent 将作为一个稳定的功能出现。

本章节主要还是围绕 legacy 模式下的 state 。通过本文学习，目的是让大家了解 React 更新流程，以及类组件 setState 和函数组件 useState 的诸多细节问题。

## 二 类组件中的 statesetState用法


![01.jpg](/markdown/111.png)
