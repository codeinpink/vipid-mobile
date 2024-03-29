// https://github.com/uttesh/ng2letteravatar

import { Component, ElementRef, OnInit, OnDestroy, AfterViewInit, Input } from '@angular/core';
declare function unescape(x: string): string;

export class LAmeta {
    defaultColors: string[] = ["#5A8770", "#B2B7BB", "#6FA9AB", "#F5AF29", "#0088B9", "#F18636", "#D93A37", "#A6B12E", "#5C9BBC", "#F5888D", "#9A89B5", "#407887", "#9A89B5", "#5A8770", "#D33F33", "#A2B01F", "#F0B126", "#0087BF", "#F18636", "#0087BF", "#B2B7BB", "#72ACAE", "#9C8AB4", "#5A8770", "#EEB424", "#407887"];
    defaultTextColor: string = '#ffffff';
    defaultBorder: string = 'border:2px solid #4fbfa6';
    defaultTriangleup: string = 'width: 0;height: 0;border-left: 50px solid transparent;border-right: 50px solid transparent;border-bottom: 100px solid;';
    deafultFontsize: string = '30';
    defaultHeight: string = '50';
    deafultWidth: string = '50';
    defaultRadius: string = 'border-radius:50%;';
    deafultDynamic: string = 'false';
    defaultRotatedeg: string = '0';
    defaultAvatarborder:string = 'false';
    defaultFontWeight: string = '400';
    defaultFontFamily: string = 'HelveticaNeue-Light,Helvetica Neue Light,Helvetica Neue,Helvetica, Arial,Lucida Grande, sans-serif';
}

export class Attributes {
    alphabetcolors: string = 'avatar-alphabet-colors';
    textColor: string = 'avatar-text-color';
    defaultBorder: string = 'avatar-default-border';
    triangleup: string = 'avatar-triangle-up';
    fontsize: string = 'avatar-font-size';
    height: string = 'avatar-height';
    width: string = 'avatar-width';
    radius: string = 'avatar-radius';
    avatarcustombgcolor: string = 'avatar-custom-bg-color';
    dynamic: string = 'avatar-dynamic';
    fontWeight: string = 'avatar-font-weight';
    fontFamily: string = 'avatar-font-family';
    shape: string = 'avatar-shape';
    data: string = 'avatar-data';
    rotatedeg: string = 'avatar-rotate-degree';
    avatarborder:string = 'avatar-border';

}

@Component({
    selector: 'ng2-letter-avatar',
    template: '<ng-content></ng-content>'
})
export class Ng2LetterAvatar implements OnInit, OnDestroy, AfterViewInit {
    private letteravatar: any;
    private imageTag: HTMLElement;
    _meta: LAmeta = new LAmeta();
    attribute: Attributes = new Attributes();
    @Input('avatar-alphabet-colors') alphabetcolors: string[];
    @Input('avatar-text-color') textColor: string;
    @Input('avatar-default-border') defaultBorder: string;
    @Input('avatar-triangle-up') triangleup: string;
    @Input('avatar-font-size') fontsize: string;
    @Input('avatar-height') height: string;
    @Input('avatar-width') width: string;
    @Input('avatar-font-weight') fontWeight: string;
    @Input('avatar-font-family') fontFamily: string;
    base: string = 'data:image/svg+xml;base64,';
    @Input('avatar-radius') radius: string;
    @Input('avatar-dynamic') dynamic: string;
    @Input('avatar-rotate-degree') rotatedeg: string;
    @Input('avatar-char-count') charCount: string = '1';
    @Input('avatar-data') data: string;
    @Input('avatar-border-style') avatarBorderStyle: string;
    @Input('avatar-border') avatarborder: string;
    @Input('avatar-custom-border') avatarcustomborder: string;
    @Input('avatar-shape') shape: string;
    @Input('avatar-custom-bg-color') avatarcustombgcolor: string;


    constructor(el: ElementRef) {
        this.letteravatar = el.nativeElement;
    }

    ngAfterViewInit(): void {
//        console.log('input data:' + this.data);
//        console.log('element data:' + this.letteravatar['data']);
        if (!this.alphabetcolors) {
            this.alphabetcolors = this.getPropertyValue(this.attribute.alphabetcolors) ?
                this.getPropertyValue(this.attribute.alphabetcolors) : this._meta.defaultColors;
        }
        if (!this.textColor) {
            this.textColor = this.getPropertyValue(this.attribute.textColor) ?
                this.getPropertyValue(this.attribute.textColor) : this._meta.defaultTextColor;
        }
        if(!this.avatarcustombgcolor){
            this.avatarcustombgcolor = this.getPropertyValue(this.attribute.avatarcustombgcolor);
        }

        if (!this.avatarborder) {
            this.avatarborder = this.getPropertyValue(this.attribute.avatarborder) ?
                this.getPropertyValue(this.attribute.avatarborder) : this._meta.defaultAvatarborder;
        }

        if (!this.defaultBorder) {
            this.defaultBorder = this.getPropertyValue(this.attribute.defaultBorder) ?
                this.getPropertyValue(this.attribute.defaultBorder) : this._meta.defaultBorder;
        }
        if (!this.triangleup) {
            this.triangleup = this.getPropertyValue(this.attribute.triangleup) ?
                this.getPropertyValue(this.attribute.triangleup) : this._meta.defaultTriangleup;
        }
        if (!this.fontsize) {
            this.fontsize = this.getPropertyValue(this.attribute.fontsize) ?
                this.getPropertyValue(this.attribute.fontsize) : this._meta.deafultFontsize;
        }
        if (!this.height) {
            this.height = this.getPropertyValue(this.attribute.height) ?
                this.getPropertyValue(this.attribute.height) : this._meta.defaultHeight;
        }
        if (!this.width) {
            this.width = this.getPropertyValue(this.attribute.width) ?
                this.getPropertyValue(this.attribute.width) : this._meta.deafultWidth;
        }
        if (!this.radius) {
            this.radius = this.getPropertyValue(this.attribute.radius) ?
                this.getPropertyValue(this.attribute.radius) : this._meta.defaultRadius;
        }
        if (!this.dynamic) {
            this.dynamic = this.getPropertyValue(this.attribute.dynamic) ?
                this.getPropertyValue(this.attribute.dynamic) : false;
        }
        if (!this.rotatedeg) {
            this.rotatedeg = this.getPropertyValue(this.attribute.rotatedeg) ?
                this.getPropertyValue(this.attribute.rotatedeg) : this._meta.defaultRotatedeg;
        }
        if (!this.fontWeight) {
            this.fontWeight = this.getPropertyValue(this.attribute.fontWeight) ?
                this.getPropertyValue(this.attribute.fontWeight) : this._meta.defaultFontWeight;
        }
        if (!this.fontFamily) {
            this.fontFamily = this.getPropertyValue(this.attribute.fontFamily) ?
                this.getPropertyValue(this.attribute.fontFamily) : this._meta.defaultFontFamily;
        }
        if (!this.shape) {
            this.shape = this.getPropertyValue(this.attribute.shape);
        }
        if (!this.data) {
            this.data = this.getPropertyValue(this.attribute.data);
        }
        this.createAvatar();
    }
    private getPropertyValue(property: string): any {
        let result: any = '';
        result = this.letteravatar.getAttribute(property);
        return result;
    }

    private createAvatar(): void {
        var c = '';
        if (this.charCount == '2') {
            var _data = getFirstAndLastName(this.data.toUpperCase());
            if (_data) {
                c = _data;
            } else {
                c = this.data.substring(0, +this.charCount).toUpperCase();
            }
        } else {
            c = this.data.substring(0, +this.charCount).toUpperCase();
        }
        var textTag = this.getCharacterTextTag(c, this.textColor, this.fontFamily, this.fontWeight, this.fontsize);
        var colorIndex;
        var color = '';

        /**
        * Populate the colors according to attributes
        */
        if (c.charCodeAt(0) < 65) {
            color = getRandomColors();
        } else {
            colorIndex = Math.floor((c.charCodeAt(0) - 65) % this.alphabetcolors.length);
            color = this.alphabetcolors[colorIndex];
        }

        if (this.avatarcustombgcolor) {
            color = this.avatarcustombgcolor;
        }

        this.createSvg(this.width, this.height, color, textTag);
        var lvcomponent = this.getLVText();
        var svgHtml = window.btoa(unescape(encodeURIComponent(lvcomponent)));
        var component;
        var base = this.base;
        var _style = '';
        if (this.avatarBorderStyle) {
            _style = this.avatarBorderStyle;
        } else if(this.avatarborder === 'true'){
            _style = this.defaultBorder;
        }

        if (this.rotatedeg != '0') {
            _style = '-ms-transform: rotate(' + this.rotatedeg + 'deg); -webkit-transform: rotate(' + this.rotatedeg + 'deg); transform: rotate(' + this.rotatedeg + 'deg)';
        }

        if (this.shape) {
            if (this.shape === 'round') {
                var round_style = this.radius + _style;
                if (this.data.indexOf('http') > -1 || this.data.indexOf('data:image') > -1) {
                    var img_size = 'width:' + this.width + 'px;height:' + this.height + 'px;';
                    component = "<img src=" + this.data + " style='" + img_size + round_style + "'  />";
                } else {
                    component = "<img src=" + base + svgHtml + " style='" + round_style + "' title='" + this.data + "' />";
                }
            }
        } else {
            if (this.data.indexOf('http') > -1 || this.data.indexOf('data:image') > -1) {
                var img_size = 'width:' + this.width + 'px;height:' + this.height + 'px;';
                component = "<img src=" + this.data + " style='" + img_size + _style + "'  />";
            } else {
                component = "<img src=" + base + svgHtml + " style='" + _style + "' title='" + this.data + "' />";
            }
        }

        //        if (this.dynamic === 'true') {
        //            this.letteravatar.innerHTML = component;
        //        } else {
        //            element.replaceWith(component);
        //        }
        this.letteravatar.innerHTML = component;

    }

    private getLVText(): string {
        var lvTag = document.createElement('div');
        lvTag.appendChild(this.imageTag.cloneNode());
        return this.imageTag.outerHTML;
    }
    /**
 * Populate the svg tag which will used for the avatar generation
 * @param {type} width
 * @param {type} height
 * @param {type} color
 * @returns {unresolved}
 */
    private createSvg(width, height, color, cobj): string {

        var svgTag = document.createElement('svg');
        svgTag.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        svgTag.setAttribute('pointer-events', 'none');
        svgTag.setAttribute('width', width);
        svgTag.setAttribute('height', height);
        svgTag.setAttribute('style', 'background-color:' + color + ';width:' + width + 'px' + ';height:' + height + 'px');
        //svgTag.insertAdjacentHTML('beforeend', cobj)
        svgTag.appendChild(cobj);
        //svgTag.innerHTML = cobj;
        this.imageTag = svgTag;

        return svgTag.innerHTML;
    }

    /**
 *  Generate the Letter tag by using the svg text element
 * @param {type} character
 * @param {type} textColor
 * @param {type} fontFamily
 * @param {type} fontWeight
 * @param {type} fontsize
 * @returns {unresolved}
 */
    private getCharacterTextTag(character, textColor, fontFamily, fontWeight, fontsize): HTMLElement {
        var textTag = document.createElement('text');
        textTag.setAttribute('text-anchor', 'middle');
        textTag.setAttribute('x', '50%');
        textTag.setAttribute('y', '50%');
        textTag.setAttribute('dy', '0.35em');
        textTag.setAttribute('pointer-events', 'auto');
        textTag.setAttribute('fill', textColor);
        textTag.setAttribute('font-family', fontFamily);
        textTag.setAttribute('style', 'font-weight:' + fontWeight + ';font-size:' + fontsize + 'px');
        textTag.innerText = character;
        return textTag;
    }

    ngOnInit() {
    }

    ngOnDestroy() {
        if (this.letteravatar) {
            // this breaks.. need to figure out what this is for
            //this.letteravatar.clear();
        }
    }


}

/**
 * Get the random colors
 * @returns {String}
 */
function getRandomColors() {
    var letters = '0123456789ABCDEF'.split('');
    var _color = '#';
    for (var i = 0; i < 6; i++) {
        _color += letters[Math.floor(Math.random() * 16)];
    }
    return _color;
}
/**
 * get the first name and last name first letters and combined and form the letter avatar
 * @param {type} data
 * @returns {unresolved}
 */
function getFirstAndLastName(data) {
    var names = data.split(" ");
    if (names && names.length >= 2) {
        var firstName = names[0];
        var lastName = names[1];
        if (firstName && lastName) {
            var text = firstName.substr(0, 1) + lastName.substr(0, 1);
            return text;
        } else {
            return data.substr(0, 2);
        }
    }
}
