## Frame images with their dominant color

__Pure front-end app using FileReader & Canvas Web API__

<a href="https://southchen.github.io/dominant-color-frame/">Entry</a>

<img src="screen shot.png" alt="screen shot" style="zoom:47%;" />

### The demand

I love to take photos in the different ratios (eg. 3:4,16:9 ) in both landscape and portrait.

But this leads to one subtle issue when I was trying to upload to social media that the images in different ratios and orientations are not perfectly aligned. And I don't want Instagram to corp the photos to destroy the original composition.

So, I have come up with this solution. Wrapping the photo with its dominant color looks cool (to me, at least).

### Features

No 3-rd party library (except the style library Semantic). Pure vanilla javascript.

It's pure front-end.

Support multiple images upload and batch download.

Toggle the output with/without shadow beneath the image.

### Implementation

FileReader & Canvas Web API 
Promisify the function of resizing of the file before its rendering on the page


### Sample


<img src="Untitled Diagram.jpg" alt="Sample" style="zoom:45%;" />
