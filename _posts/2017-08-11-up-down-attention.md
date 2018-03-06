---
title: "Bottom-Up and Top-Down Attention for Image Captioning and Visual Question Answering"
excerpt: "Focusing attention at the level of objects and other salient image regions."
layout: project
tags: [2017, CVPR, visual question answering, VQA, image captioning, VQA challenge]
permalink: /up-down-attention/
header:
  teaser: rcnn_example_2.png

---

[Peter Anderson](/), [Xiaodong He](https://www.microsoft.com/en-us/research/people/xiaohe/), [Chris Buehler](https://www.linkedin.com/in/christopher-buehler-3656a29), [Damien Teney](https://www.damienteney.info/), [Mark Johnson](http://web.science.mq.edu.au/~mjohnson/), [Stephen Gould](http://users.cecs.anu.edu.au/~sgould/), [Lei Zhang](https://www.microsoft.com/en-us/research/people/leizhang/)

**CVPR 2018 (Selected for Oral Presentation)**

Top-down visual attention mechanisms have been used extensively in image captioning and visual question answering (VQA) to enable deeper image understanding through fine-grained analysis and even multiple steps of reasoning. In this work, we propose a combined bottom-up and topdown attention mechanism that enables attention to be calculated at the level of objects and other salient image regions. This is the natural basis for attention to be considered. Within our approach, the bottom-up mechanism (based on Faster R-CNN) proposes image regions, each with an associated feature vector, while the top-down mechanism determines feature weightings. Applying this approach to image captioning, our results on the MSCOCO test server establish a new state-of-the-art for the task, improving the best published result in terms of CIDEr score from **114.7** to **117.9** and BLEU-4 from **35.2** to **36.9**. Demonstrating the broad applicability of the method, applying the same approach to VQA we obtain first place in the [2017 VQA Challenge](http://www.visualqa.org/workshop.html). 

<figure class="align-center"> 
  <figcaption>Caption: Two men playing frisbee in a dark field.</figcaption>
  <img src="{{ site.url }}{{ site.baseurl }}/images/20459.png" alt="">
  <figcaption>Question: What color is illuminated on the traffic light? Answer left: green. Answer right: red.</figcaption>
  <img src="{{ site.url }}{{ site.baseurl }}/images/vqa_527379.png" alt="" style="max-width: 47%;">
  <img src="{{ site.url }}{{ site.baseurl }}/images/vqa_27756.png" alt="" style="max-width: 47%;">
</figure>

### Paper and Code

[PDF](/images/1707.07998-up-down.pdf){: .btn .btn--info}
[Features Code](https://github.com/peteanderson80/bottom-up-attention){: .btn .btn--info}
[Captioning Code](https://github.com/peteanderson80/Up-Down-Captioner){: .btn .btn--info}


### Reference
```
@article{Anderson2017up-down,
  author = {Peter Anderson and Xiaodong He and Chris Buehler and Damien Teney and Mark Johnson and Stephen Gould and Lei Zhang},
  title = {Bottom-Up and Top-Down Attention for Image Captioning and Visual Question Answering},
  journal = {arXiv preprint arXiv:1707.07998},
  year = {2017}
}
```

