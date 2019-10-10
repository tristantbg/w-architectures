import React, { Component } from 'react';

class FaviconLetter extends Component {
    componentDidMount(){
        const {
            texte, background, foreground
        } = this.props
        const favicon = document.querySelector("link[rel='shortcut icon']");
        
        
        const faviconSize = 64;
        const faviconSizeHalf = faviconSize/2;

        const fontStyle = faviconSizeHalf+"pt Theinhardt";

        const canvas = document.createElement('canvas');
        canvas.width = faviconSize;
        canvas.height = faviconSize;

        const context = canvas.getContext('2d');
        const img = document.createElement('img');
        img.src = favicon.href;

        img.onload = () => {
            // Draw Original Favicon as Background
            context.drawImage(img, 0, 0, faviconSize, faviconSize);

            // Draw Notification Circle
            // context.beginPath();
            // context.arc( canvas.width - faviconSize / 3 , faviconSize / 3, faviconSize / 3, 0, 2*Math.PI);
            // context.fillStyle = '#FF0000';
            // context.fill();
            // var metrics = context.measureText(texte);
            // console.log(metrics)
            context.beginPath();
            context.fillStyle = background;
            //context.strokeStyle = "black";
            context.font = fontStyle
            context.textAlign = "center";
            context.textBaseline = "top";

            //const textHeight = this.getTextHeight(context.font, fontStyle)
            context.fillRect(0, 0, faviconSize, faviconSize);

            context.fill();
            context.beginPath();
            context.fillStyle = foreground;
            context.fillText(
                texte, 
                faviconSizeHalf, 
                faviconSizeHalf/2 -1
            );
            context.fill();

            // Replace favicon
            favicon.href = canvas.toDataURL('image/jpg');
            
        };
    }

    getTextHeight(txt, font) {
        var el = document.createElement('div'), height;
        el.style.cssText = "position:fixed;padding:0;left:-9999px;top:-9999px;font:" + font;
        el.textContent = txt;
      
        document.body.appendChild(el); 
        height = parseInt(getComputedStyle(el).getPropertyValue('height'), 10);
        document.body.removeChild(el);
        
        return height
    }
    
    render() {
        return null
    }
}

export default FaviconLetter;