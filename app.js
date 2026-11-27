const skinSamples = ["data:image/webp;base64,UklGRjwBAABXRUJQVlA4IDABAADQDgCdASrwAJYAPlEokkcjoqGhoEgAcAoJaW7Pn0LzRvnnFLAGLLVyQCe16KuEGQQ0y5rz0RDqkFBOG26Hb4q4QZVi8/PRcIFuQ5E0rKCWVmKTKW23N1wDox2gDRoFMjiD0lj35uOYqJ6E7Mf8WT262IzhiULJIq6ps0UFBeaIAP7wqQP//wG6+LaZf//EOcQW1HXmBMjxsCizJWrIVWJmsjCJGx63yDc9GyFeOtpnIai7F0SV1dzBBGj3DQShZNphNKav0lUu5hkac4qQZYa0o3G+siIrCAIKMQuC/0/b3fJHCHVKG2Nne5gY7OcNiUApraUYgEgxWjlJUonV1L73RAYUIHuKPQxOsQBCZAt8w82MFNhHEtxFDHBSmGeSHHsF9onTQ/o1nqRKslp0AAAA", "data:image/webp;base64,UklGRgYCAABXRUJQVlA4IPoBAAAwEgCdASrwAJYAPlEokkajoyGhodv4AHAKCWluiYk3+zYDE/0pUw/OLKwODCoC4Y6QX4qa+rIGIGFUaRWNCbgYTRWIfLbf+aMWVB3j7suGE6F6umkqNnuBsaz2hVQlUX950XkGIYLl/vof2uAAf2JBaavGxYu2QY3CVzvKK6uaNX0LHO1vK5WNc14xDbghhnUaJfrjhXBRQGqAAP7wqMN/+A/iX9gXj//iHP5cv4gsG8SWqyzuzaRiySmgIYcHshZ3F8VyX4TyRent00Fy/y5EZ3KPWiiS9S4zPj5j36EN/rQAn/247judiDg+gHyg0x+c1NWhmJIA8bE9GXuHzm03+we/Jt1f6OFksvj7NlcVdTjDRY5BkQvyn33cWaMhF4G+ZaL3YpHxS3tSlnkkmUdknUTLGlaRY4cHiA2l/iqAP3f98jZrb6s1EbVlqKI5/LGBspGxg1x8iksLBLyqYSF0xitforoN/tAQnxiT4bCk9CZ/nSjR+nwtxJ23oJi4e2Agw+T4WvogIn8WK+wrEf0mLc+ufsJniSy82pTpyddBy4jkYDoMfosxO95QEQ4dY0eaDEjAyCccwAgIjCEqtAjY1jJ8DyCVlI91GasgQku0NJcz7Y9kq1rcpuyvZ0YiQCsAsrQ93aPrfPeB0sdFXTNOwcCAV1CxoQAAAA==", "data:image/webp;base64,UklGRngGAABXRUJQVlA4IGwGAAAwLACdASrwAJYAPlEmjkUjoiGhKlcI8HAKCWlr/dn29Lqm6R1vy0wgLIdXTi+w1Xw+JnfPtMbw/DLS4/82zS/hgkasqYz2VK4X5McmozgTK8qwL6TrlExKwe4RnFOOtQOMlPRiWyUu6cUUIMRs5lHMptZosKKFvHgU9DgumZR0QTEBi5YUK5bRCPy2MyJEbH+aqGToC2u1AsI56yJ7WPeRL0t1im+HemtSdC/4MEnn4c/UhAT4vw6YqdZTqDP94AyXDCUZ7bsOQooUbQXUp19GmmYQfuqUZvDzbFbP7bMNZyJTZF21GBGVeYqT3VpD1ORaymgE17qEXTm9rnhxpO8k9oEWMmpzC8KPh9n1+Q6ZOh5UiX9U2EwRx5Hx12SRnbqIV3SB1RQ0FMk7xl+LOkrEPVq08YndS0DARwvNZcTZjNTT9JHAUBUDXykc69SO/AxMvQk8LEcsDtrwj1knQU2Uv+dQ7uDUwmucMAD+8KigD/9x/ZH85VW//4hz+XL+ILAcbwo4IpaA/kfKBdKHgF9DeXkFDDYalNS2h2z9skxrcGEoRfHow5zuc+yZjJqKqpAAs30urauqIdg1L0WERp+GmHKGVdUAfdi1+Hf1M4/IpXN2ONOAhjWxt8Cq+LTmjEe19yW2P/wkgEJBDyao0kks/QDfvYCGe+xAG7HDlloDRVjFuACC/6rwg8Xhq07un2FeM5dMAma5CMo/T4cIWsTsbfN4AumKc7BlXbsGL4WsVax6U1U93C+kd7K7WB5UpfJ1roK/gahgXWZMKTSHKpE4Rzjdl3GYuL3qlPxmvtA/oz/wQfq61SwIxsE69/nTyJFU75qm0jSuTs/Gij1euD+m9LnmHn10XVSL9AL1lnkmeqqLW1DJkzqTEkJoXJoM4y6GQ+qh50FV5HxkZ17znYEAf+aLpNSA5N+yA9d84NNPoHeNsoWfKqhSSfn4Cw/TzM4BDVoLxqH6iLpvEOjhFJbNn0I5NPPCjgFJ19VHVSzGSlEhBOzIu3aWPUmWx3aC79XXQpQz0ThP/UuNNAL39GruKSePX+PWJxKPOtAYsBBB+R/BnamhJc5YnL4ViXEbK/Six82IcZ4QgKepezYy7ipv2SMqjPodCQ7W7HPgNIl+JZ4AKW/Z4xX0dEqHB0CE6bciHMSe5sNPNGSYrOGVFUfyxgAbDMxlFhZgXGLfrXiRmJAuQacAahZhZmHNjH9wE5p8iMEmLKcPkphyJxqEBsAaLb8fznKisGwUVHxOpTymLsmCcBt8VSLuTGl3UYu/zWSAI2N9qw9ytAPFtqB3ZogFP3bJ1akdmcVUoC17syGHNVD611qnIhi37LKlNdp9PA8ABp54s+eJFKY3e1LXVWxQLF8e0O3TKYs4oLGVO141Qbo+BL6891eMy1cUlH/+JfUx68qNN9jJ1BK8+gjbmR2kMWZ/b7O0BpdWhpD8JtWITk+UcrDwYYk1DFSSdc5wBbFfucO7dVz1DiF0qbHitb7kk6Quv762SJLAeUscnzdztYaB5RvCyK6bltZbxfBswjGaLkKGqLLhCq23rWUMBkdM2AAs0AX7t9g3KjIk74Lr/XH8q/zm2dwb7WX72C2CzwJSDf/Rmc4IKyZyUXjC+ZLr3PgaoqLfidfvQu3qIf3iiBu+UkX00cpXBCxi+AyoM+7BL7W4fwt85aERhKw221DOuanjfYrTfYP7NWewIuP5/QEWHdHcpqGeXvfml1vKl5LGBBb7hYuVsVnEZAgNLtPgsmup1kWt7Jis8zj383N2ZlZOWHUlwDKiU66iNmY6we6WNgmeBzYHtlgEkIzq5x4APPAA1166A431lQsO4KH+SdxZg9CFnHTV3lerZck1whEonkBIBe56wbwz+IYmoptIamXak0r4miGnr2oWjdxmJ8MZJNZ+Vdsv9hRULcuGtjYiUCk/Q1vDO4J1OQv/crEKu15LYtrpPt9/t11OI/UfeYRzql6XBwVddf9FCgRyFy8DwSQqgADTcPYANPczff1Kur5ReOWnsGPp82YIfcU7eR4MljowjHB85wUL9etvvTVOiMKWyMIpeYuB8sIo7AjSh+XuMwGlUvyCgcGhY75ELtnxemmnp/X3PYmuDVW6QkGvCssfPHklYttgUwFFQMxqlblGESWXEEPmUmoWHIrRiBMi5ltvhY/ntNKe+vH1WDNdnb9cJbbBwJBAAAA=", "data:image/webp;base64,UklGRnwEAABXRUJQVlA4IHAEAACwIACdASrwAJYAPlEojkYjoqEhpXmYgHAKCWduiXbC5pgYJ5BWSrsapZzgOpsMZ5B99MwC9SrZMXXOxn/I4/p7d6bwP1Bs9D/+ecP+DDn1rDc+oIfTdkg6JMMFF+4Le/DX42EY44KKya2SGcBzzcTxbzcIRC+ir84T6jDj4N4zkjybwrLbZ1FSpaTME+oIEk8GgAtx/Vqv9P+OFskV0Yv/9UqHDFaYtESeM8ifZwnq1dDYGPnowNKlnPxcYsd+ONuO8/zWXs+gnlxEOCIsqLqViSgnBb9advpILfJxBPu3b6ZJ3/WqepZeJcpjvwSki/2N6RKgSMzR+oanXhAAlWJ5ZmIgRr9oIiqTFCSw9wAA/rhZ///uP4t/Ftnf/8Q5+1H+ILKLvuPSW8pX6QFAJKpIcEuscDtM4JBN3Ux4Yj7f/YG60KCyoooTjn16YnFZRGtTEHfHymawun4zS2wXEiVjwfptlypccyAf+74eiquS1nCkbEbC5NGxHdfA2CbugEvT+71ycOwloBi0bg4wRtOTUHZppqhnT4ANwuYNIxpJre89xIpWsrb045CHc5nbPQ0qwMDDumkrigUYqpz2zEO3pQbRW/Wrol7y5+18jHMGWQmi0XQlqY1dZ3s5ZjNFdzwbNuHnhvCReCqhWErgY8rW/v8LS5BWdqxo/0HybjgDPUkJ1hAIN0mhWBhgU9WVb1uC0vRFuhwjJXb3/6Ho/u50nFlU22g6xSRwQcWw3YKu6Dk00qxB6Devf0XjGEv0SCEhYiBfb4dEdXMSu0gKHoMbnX/gmpXLnan0QWOgEmSZp+C7bKfd2qAuBphxezi/wydd+FJvxCOAfPwiyc3fyKnm3XTDbokB5TiNkfYU71+eXh3ldGpzGv2MUIvu2whvcWIsDDSMWFMKOTuSP2BNlZaHM57Uq1JoqNfaRsYhrz2Wjz3k21hoqJzs1lCsjuFeoCYeb0QaoxdCjtXn9LugIj75/DT6ty+S3ykop4k9FMzDbU/Hpm+juZrXlFXZqDgobZezqfIFTetyuIX9BkOKU36o9kwL6IEnD8ntPG1vbtiPIz/zOdX09RUoUX39HVYGVSdYDU8fSdZOcZpzpTbMzB9BNtdtQfzUZ/wxKk8xUlVYez3n+mTwU40UFFWOCXOJhBAuDrdele7eZwObw8aV1aPap4BlZSUuGoj4wvt2Ce5qiLgAB1mvpDy9sM+bPYaIzy/B1ID6vs0BTrSIfZyXV19kdaQCEWCfEk5FYY3O3SoXRjoevqhPdh2vrW+K4MmmodQsA3g1vpgKapS2SBTF9yPC7iq/7EcND7Sb3RHyz7M2cyldI//LkpEHFcNJYyRA4rlFte+1JgScvWGt/d2Q8xvrpG8V6RN8wgkMfy9+KgjF+sjwrYwXA8FFAJtc5ik+TgeTzK97EQsRsu/ukhkVAinv4bcfC0aS2xQ10b2tVmdsAaoCb8bWcHW5YGsaZqF3kgVwJX444caE7hypLTWwcne1Vwy6X1ZWpai4l2whREQAAA=="];

/* QRCode for JavaScript, Copyright (c) 2009 Kazuhiko Arase
MIT license. The QR Code word mark belongs to DENSO WAVE INCORPORATED.
Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do
so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
Adapted for a browser bundle from qrcode-terminal.
*/
const QRCode = (() => {
  const modules = {
    './QR8bitByte': (module, require) => {
var QRMode = require('./QRMode');

function QR8bitByte(data) {
	this.mode = QRMode.MODE_8BIT_BYTE;
	this.data = data;
}

QR8bitByte.prototype = {

	getLength : function() {
		return this.data.length;
	},
	
	write : function(buffer) {
		for (var i = 0; i < this.data.length; i++) {
			// not JIS ...
			buffer.put(this.data.charCodeAt(i), 8);
		}
	}
};

module.exports = QR8bitByte;

    },
    './QRBitBuffer': (module, require) => {
function QRBitBuffer() {
	this.buffer = [];
	this.length = 0;
}

QRBitBuffer.prototype = {

	get : function(index) {
		var bufIndex = Math.floor(index / 8);
		return ( (this.buffer[bufIndex] >>> (7 - index % 8) ) & 1) == 1;
	},
	
	put : function(num, length) {
		for (var i = 0; i < length; i++) {
			this.putBit( ( (num >>> (length - i - 1) ) & 1) == 1);
		}
	},
	
	getLengthInBits : function() {
		return this.length;
	},
	
	putBit : function(bit) {
	
		var bufIndex = Math.floor(this.length / 8);
		if (this.buffer.length <= bufIndex) {
			this.buffer.push(0);
		}
	
		if (bit) {
			this.buffer[bufIndex] |= (0x80 >>> (this.length % 8) );
		}
	
		this.length++;
	}
};

module.exports = QRBitBuffer;

    },
    './QRErrorCorrectLevel': (module, require) => {
module.exports = {
	L : 1,
	M : 0,
	Q : 3,
	H : 2
};


    },
    './QRMaskPattern': (module, require) => {
module.exports = {
	PATTERN000 : 0,
	PATTERN001 : 1,
	PATTERN010 : 2,
	PATTERN011 : 3,
	PATTERN100 : 4,
	PATTERN101 : 5,
	PATTERN110 : 6,
	PATTERN111 : 7
};

    },
    './QRMath': (module, require) => {
var QRMath = {

	glog : function(n) {
	
		if (n < 1) {
			throw new Error("glog(" + n + ")");
		}
		
		return QRMath.LOG_TABLE[n];
	},
	
	gexp : function(n) {
	
		while (n < 0) {
			n += 255;
		}
	
		while (n >= 256) {
			n -= 255;
		}
	
		return QRMath.EXP_TABLE[n];
	},
	
	EXP_TABLE : new Array(256),
	
	LOG_TABLE : new Array(256)

};
	
for (var i = 0; i < 8; i++) {
	QRMath.EXP_TABLE[i] = 1 << i;
}
for (var i = 8; i < 256; i++) {
	QRMath.EXP_TABLE[i] = QRMath.EXP_TABLE[i - 4]
		^ QRMath.EXP_TABLE[i - 5]
		^ QRMath.EXP_TABLE[i - 6]
		^ QRMath.EXP_TABLE[i - 8];
}
for (var i = 0; i < 255; i++) {
	QRMath.LOG_TABLE[QRMath.EXP_TABLE[i] ] = i;
}

module.exports = QRMath;

    },
    './QRMode': (module, require) => {
module.exports = {
    MODE_NUMBER :       1 << 0,
    MODE_ALPHA_NUM :    1 << 1,
    MODE_8BIT_BYTE :    1 << 2,
    MODE_KANJI :        1 << 3
};

    },
    './QRPolynomial': (module, require) => {
var QRMath = require('./QRMath');

function QRPolynomial(num, shift) {
	if (num.length === undefined) {
		throw new Error(num.length + "/" + shift);
	}

	var offset = 0;

	while (offset < num.length && num[offset] === 0) {
		offset++;
	}

	this.num = new Array(num.length - offset + shift);
	for (var i = 0; i < num.length - offset; i++) {
		this.num[i] = num[i + offset];
	}
}

QRPolynomial.prototype = {

	get : function(index) {
		return this.num[index];
	},
	
	getLength : function() {
		return this.num.length;
	},
	
	multiply : function(e) {
	
		var num = new Array(this.getLength() + e.getLength() - 1);
	
		for (var i = 0; i < this.getLength(); i++) {
			for (var j = 0; j < e.getLength(); j++) {
				num[i + j] ^= QRMath.gexp(QRMath.glog(this.get(i) ) + QRMath.glog(e.get(j) ) );
			}
		}
	
		return new QRPolynomial(num, 0);
	},
	
	mod : function(e) {
	
		if (this.getLength() - e.getLength() < 0) {
			return this;
		}
	
		var ratio = QRMath.glog(this.get(0) ) - QRMath.glog(e.get(0) );
	
		var num = new Array(this.getLength() );
		
		for (var i = 0; i < this.getLength(); i++) {
			num[i] = this.get(i);
		}
		
		for (var x = 0; x < e.getLength(); x++) {
			num[x] ^= QRMath.gexp(QRMath.glog(e.get(x) ) + ratio);
		}
	
		// recursive call
		return new QRPolynomial(num, 0).mod(e);
	}
};

module.exports = QRPolynomial;

    },
    './QRRSBlock': (module, require) => {
var QRErrorCorrectLevel = require('./QRErrorCorrectLevel');

function QRRSBlock(totalCount, dataCount) {
	this.totalCount = totalCount;
	this.dataCount  = dataCount;
}

QRRSBlock.RS_BLOCK_TABLE = [

	// L
	// M
	// Q
	// H

	// 1
	[1, 26, 19],
	[1, 26, 16],
	[1, 26, 13],
	[1, 26, 9],
	
	// 2
	[1, 44, 34],
	[1, 44, 28],
	[1, 44, 22],
	[1, 44, 16],

	// 3
	[1, 70, 55],
	[1, 70, 44],
	[2, 35, 17],
	[2, 35, 13],

	// 4		
	[1, 100, 80],
	[2, 50, 32],
	[2, 50, 24],
	[4, 25, 9],
	
	// 5
	[1, 134, 108],
	[2, 67, 43],
	[2, 33, 15, 2, 34, 16],
	[2, 33, 11, 2, 34, 12],
	
	// 6
	[2, 86, 68],
	[4, 43, 27],
	[4, 43, 19],
	[4, 43, 15],
	
	// 7		
	[2, 98, 78],
	[4, 49, 31],
	[2, 32, 14, 4, 33, 15],
	[4, 39, 13, 1, 40, 14],
	
	// 8
	[2, 121, 97],
	[2, 60, 38, 2, 61, 39],
	[4, 40, 18, 2, 41, 19],
	[4, 40, 14, 2, 41, 15],
	
	// 9
	[2, 146, 116],
	[3, 58, 36, 2, 59, 37],
	[4, 36, 16, 4, 37, 17],
	[4, 36, 12, 4, 37, 13],
	
	// 10		
	[2, 86, 68, 2, 87, 69],
	[4, 69, 43, 1, 70, 44],
	[6, 43, 19, 2, 44, 20],
	[6, 43, 15, 2, 44, 16],

	// 11
	[4, 101, 81],
	[1, 80, 50, 4, 81, 51],
	[4, 50, 22, 4, 51, 23],
	[3, 36, 12, 8, 37, 13],

	// 12
	[2, 116, 92, 2, 117, 93],
	[6, 58, 36, 2, 59, 37],
	[4, 46, 20, 6, 47, 21],
	[7, 42, 14, 4, 43, 15],

	// 13
	[4, 133, 107],
	[8, 59, 37, 1, 60, 38],
	[8, 44, 20, 4, 45, 21],
	[12, 33, 11, 4, 34, 12],

	// 14
	[3, 145, 115, 1, 146, 116],
	[4, 64, 40, 5, 65, 41],
	[11, 36, 16, 5, 37, 17],
	[11, 36, 12, 5, 37, 13],

	// 15
	[5, 109, 87, 1, 110, 88],
	[5, 65, 41, 5, 66, 42],
	[5, 54, 24, 7, 55, 25],
	[11, 36, 12],

	// 16
	[5, 122, 98, 1, 123, 99],
	[7, 73, 45, 3, 74, 46],
	[15, 43, 19, 2, 44, 20],
	[3, 45, 15, 13, 46, 16],

	// 17
	[1, 135, 107, 5, 136, 108],
	[10, 74, 46, 1, 75, 47],
	[1, 50, 22, 15, 51, 23],
	[2, 42, 14, 17, 43, 15],

	// 18
	[5, 150, 120, 1, 151, 121],
	[9, 69, 43, 4, 70, 44],
	[17, 50, 22, 1, 51, 23],
	[2, 42, 14, 19, 43, 15],

	// 19
	[3, 141, 113, 4, 142, 114],
	[3, 70, 44, 11, 71, 45],
	[17, 47, 21, 4, 48, 22],
	[9, 39, 13, 16, 40, 14],

	// 20
	[3, 135, 107, 5, 136, 108],
	[3, 67, 41, 13, 68, 42],
	[15, 54, 24, 5, 55, 25],
	[15, 43, 15, 10, 44, 16],

	// 21
	[4, 144, 116, 4, 145, 117],
	[17, 68, 42],
	[17, 50, 22, 6, 51, 23],
	[19, 46, 16, 6, 47, 17],

	// 22
	[2, 139, 111, 7, 140, 112],
	[17, 74, 46],
	[7, 54, 24, 16, 55, 25],
	[34, 37, 13],

	// 23
	[4, 151, 121, 5, 152, 122],
	[4, 75, 47, 14, 76, 48],
	[11, 54, 24, 14, 55, 25],
	[16, 45, 15, 14, 46, 16],

	// 24
	[6, 147, 117, 4, 148, 118],
	[6, 73, 45, 14, 74, 46],
	[11, 54, 24, 16, 55, 25],
	[30, 46, 16, 2, 47, 17],

	// 25
	[8, 132, 106, 4, 133, 107],
	[8, 75, 47, 13, 76, 48],
	[7, 54, 24, 22, 55, 25],
	[22, 45, 15, 13, 46, 16],

	// 26
	[10, 142, 114, 2, 143, 115],
	[19, 74, 46, 4, 75, 47],
	[28, 50, 22, 6, 51, 23],
	[33, 46, 16, 4, 47, 17],

	// 27
	[8, 152, 122, 4, 153, 123],
	[22, 73, 45, 3, 74, 46],
	[8, 53, 23, 26, 54, 24],
	[12, 45, 15, 28, 46, 16],

	// 28
	[3, 147, 117, 10, 148, 118],
	[3, 73, 45, 23, 74, 46],
	[4, 54, 24, 31, 55, 25],
	[11, 45, 15, 31, 46, 16],

	// 29
	[7, 146, 116, 7, 147, 117],
	[21, 73, 45, 7, 74, 46],
	[1, 53, 23, 37, 54, 24],
	[19, 45, 15, 26, 46, 16],

	// 30
	[5, 145, 115, 10, 146, 116],
	[19, 75, 47, 10, 76, 48],
	[15, 54, 24, 25, 55, 25],
	[23, 45, 15, 25, 46, 16],

	// 31
	[13, 145, 115, 3, 146, 116],
	[2, 74, 46, 29, 75, 47],
	[42, 54, 24, 1, 55, 25],
	[23, 45, 15, 28, 46, 16],

	// 32
	[17, 145, 115],
	[10, 74, 46, 23, 75, 47],
	[10, 54, 24, 35, 55, 25],
	[19, 45, 15, 35, 46, 16],

	// 33
	[17, 145, 115, 1, 146, 116],
	[14, 74, 46, 21, 75, 47],
	[29, 54, 24, 19, 55, 25],
	[11, 45, 15, 46, 46, 16],

	// 34
	[13, 145, 115, 6, 146, 116],
	[14, 74, 46, 23, 75, 47],
	[44, 54, 24, 7, 55, 25],
	[59, 46, 16, 1, 47, 17],

	// 35
	[12, 151, 121, 7, 152, 122],
	[12, 75, 47, 26, 76, 48],
	[39, 54, 24, 14, 55, 25],
	[22, 45, 15, 41, 46, 16],

	// 36
	[6, 151, 121, 14, 152, 122],
	[6, 75, 47, 34, 76, 48],
	[46, 54, 24, 10, 55, 25],
	[2, 45, 15, 64, 46, 16],

	// 37
	[17, 152, 122, 4, 153, 123],
	[29, 74, 46, 14, 75, 47],
	[49, 54, 24, 10, 55, 25],
	[24, 45, 15, 46, 46, 16],

	// 38
	[4, 152, 122, 18, 153, 123],
	[13, 74, 46, 32, 75, 47],
	[48, 54, 24, 14, 55, 25],
	[42, 45, 15, 32, 46, 16],

	// 39
	[20, 147, 117, 4, 148, 118],
	[40, 75, 47, 7, 76, 48],
	[43, 54, 24, 22, 55, 25],
	[10, 45, 15, 67, 46, 16],

	// 40
	[19, 148, 118, 6, 149, 119],
	[18, 75, 47, 31, 76, 48],
	[34, 54, 24, 34, 55, 25],
	[20, 45, 15, 61, 46, 16]
];

QRRSBlock.getRSBlocks = function(typeNumber, errorCorrectLevel) {
	
	var rsBlock = QRRSBlock.getRsBlockTable(typeNumber, errorCorrectLevel);
	
	if (rsBlock === undefined) {
		throw new Error("bad rs block @ typeNumber:" + typeNumber + "/errorCorrectLevel:" + errorCorrectLevel);
	}

	var length = rsBlock.length / 3;
	
	var list = [];
	
	for (var i = 0; i < length; i++) {

		var count = rsBlock[i * 3 + 0];
		var totalCount = rsBlock[i * 3 + 1];
		var dataCount  = rsBlock[i * 3 + 2];

		for (var j = 0; j < count; j++) {
			list.push(new QRRSBlock(totalCount, dataCount) );	
		}
	}
	
	return list;
};

QRRSBlock.getRsBlockTable = function(typeNumber, errorCorrectLevel) {

	switch(errorCorrectLevel) {
	case QRErrorCorrectLevel.L :
		return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 0];
	case QRErrorCorrectLevel.M :
		return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 1];
	case QRErrorCorrectLevel.Q :
		return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 2];
	case QRErrorCorrectLevel.H :
		return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 3];
	default :
		return undefined;
	}
};

module.exports = QRRSBlock;

    },
    './QRUtil': (module, require) => {
var QRMode = require('./QRMode');
var QRPolynomial = require('./QRPolynomial');
var QRMath = require('./QRMath');
var QRMaskPattern = require('./QRMaskPattern');

var QRUtil = {

    PATTERN_POSITION_TABLE : [
        [],
        [6, 18],
        [6, 22],
        [6, 26],
        [6, 30],
        [6, 34],
        [6, 22, 38],
        [6, 24, 42],
        [6, 26, 46],
        [6, 28, 50],
        [6, 30, 54],        
        [6, 32, 58],
        [6, 34, 62],
        [6, 26, 46, 66],
        [6, 26, 48, 70],
        [6, 26, 50, 74],
        [6, 30, 54, 78],
        [6, 30, 56, 82],
        [6, 30, 58, 86],
        [6, 34, 62, 90],
        [6, 28, 50, 72, 94],
        [6, 26, 50, 74, 98],
        [6, 30, 54, 78, 102],
        [6, 28, 54, 80, 106],
        [6, 32, 58, 84, 110],
        [6, 30, 58, 86, 114],
        [6, 34, 62, 90, 118],
        [6, 26, 50, 74, 98, 122],
        [6, 30, 54, 78, 102, 126],
        [6, 26, 52, 78, 104, 130],
        [6, 30, 56, 82, 108, 134],
        [6, 34, 60, 86, 112, 138],
        [6, 30, 58, 86, 114, 142],
        [6, 34, 62, 90, 118, 146],
        [6, 30, 54, 78, 102, 126, 150],
        [6, 24, 50, 76, 102, 128, 154],
        [6, 28, 54, 80, 106, 132, 158],
        [6, 32, 58, 84, 110, 136, 162],
        [6, 26, 54, 82, 110, 138, 166],
        [6, 30, 58, 86, 114, 142, 170]
    ],

    G15 : (1 << 10) | (1 << 8) | (1 << 5) | (1 << 4) | (1 << 2) | (1 << 1) | (1 << 0),
    G18 : (1 << 12) | (1 << 11) | (1 << 10) | (1 << 9) | (1 << 8) | (1 << 5) | (1 << 2) | (1 << 0),
    G15_MASK : (1 << 14) | (1 << 12) | (1 << 10)    | (1 << 4) | (1 << 1),

    getBCHTypeInfo : function(data) {
        var d = data << 10;
        while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15) >= 0) {
            d ^= (QRUtil.G15 << (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15) ) );    
        }
        return ( (data << 10) | d) ^ QRUtil.G15_MASK;
    },

    getBCHTypeNumber : function(data) {
        var d = data << 12;
        while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18) >= 0) {
            d ^= (QRUtil.G18 << (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18) ) );    
        }
        return (data << 12) | d;
    },

    getBCHDigit : function(data) {

        var digit = 0;

        while (data !== 0) {
            digit++;
            data >>>= 1;
        }

        return digit;
    },

    getPatternPosition : function(typeNumber) {
        return QRUtil.PATTERN_POSITION_TABLE[typeNumber - 1];
    },

    getMask : function(maskPattern, i, j) {
        
        switch (maskPattern) {
            
        case QRMaskPattern.PATTERN000 : return (i + j) % 2 === 0;
        case QRMaskPattern.PATTERN001 : return i % 2 === 0;
        case QRMaskPattern.PATTERN010 : return j % 3 === 0;
        case QRMaskPattern.PATTERN011 : return (i + j) % 3 === 0;
        case QRMaskPattern.PATTERN100 : return (Math.floor(i / 2) + Math.floor(j / 3) ) % 2 === 0;
        case QRMaskPattern.PATTERN101 : return (i * j) % 2 + (i * j) % 3 === 0;
        case QRMaskPattern.PATTERN110 : return ( (i * j) % 2 + (i * j) % 3) % 2 === 0;
        case QRMaskPattern.PATTERN111 : return ( (i * j) % 3 + (i + j) % 2) % 2 === 0;

        default :
            throw new Error("bad maskPattern:" + maskPattern);
        }
    },

    getErrorCorrectPolynomial : function(errorCorrectLength) {

        var a = new QRPolynomial([1], 0);

        for (var i = 0; i < errorCorrectLength; i++) {
            a = a.multiply(new QRPolynomial([1, QRMath.gexp(i)], 0) );
        }

        return a;
    },

    getLengthInBits : function(mode, type) {

        if (1 <= type && type < 10) {

            // 1 - 9

            switch(mode) {
            case QRMode.MODE_NUMBER     : return 10;
            case QRMode.MODE_ALPHA_NUM  : return 9;
            case QRMode.MODE_8BIT_BYTE  : return 8;
            case QRMode.MODE_KANJI      : return 8;
            default :
                throw new Error("mode:" + mode);
            }

        } else if (type < 27) {

            // 10 - 26

            switch(mode) {
            case QRMode.MODE_NUMBER     : return 12;
            case QRMode.MODE_ALPHA_NUM  : return 11;
            case QRMode.MODE_8BIT_BYTE  : return 16;
            case QRMode.MODE_KANJI      : return 10;
            default :
                throw new Error("mode:" + mode);
            }

        } else if (type < 41) {

            // 27 - 40

            switch(mode) {
            case QRMode.MODE_NUMBER     : return 14;
            case QRMode.MODE_ALPHA_NUM  : return 13;
            case QRMode.MODE_8BIT_BYTE  : return 16;
            case QRMode.MODE_KANJI      : return 12;
            default :
                throw new Error("mode:" + mode);
            }

        } else {
            throw new Error("type:" + type);
        }
    },

    getLostPoint : function(qrCode) {
        
        var moduleCount = qrCode.getModuleCount();
        var lostPoint = 0;
        var row = 0; 
        var col = 0;

        
        // LEVEL1
        
        for (row = 0; row < moduleCount; row++) {

            for (col = 0; col < moduleCount; col++) {

                var sameCount = 0;
                var dark = qrCode.isDark(row, col);

                for (var r = -1; r <= 1; r++) {

                    if (row + r < 0 || moduleCount <= row + r) {
                        continue;
                    }

                    for (var c = -1; c <= 1; c++) {

                        if (col + c < 0 || moduleCount <= col + c) {
                            continue;
                        }

                        if (r === 0 && c === 0) {
                            continue;
                        }

                        if (dark === qrCode.isDark(row + r, col + c) ) {
                            sameCount++;
                        }
                    }
                }

                if (sameCount > 5) {
                    lostPoint += (3 + sameCount - 5);
                }
            }
        }

        // LEVEL2

        for (row = 0; row < moduleCount - 1; row++) {
            for (col = 0; col < moduleCount - 1; col++) {
                var count = 0;
                if (qrCode.isDark(row,     col    ) ) count++;
                if (qrCode.isDark(row + 1, col    ) ) count++;
                if (qrCode.isDark(row,     col + 1) ) count++;
                if (qrCode.isDark(row + 1, col + 1) ) count++;
                if (count === 0 || count === 4) {
                    lostPoint += 3;
                }
            }
        }

        // LEVEL3

        for (row = 0; row < moduleCount; row++) {
            for (col = 0; col < moduleCount - 6; col++) {
                if (qrCode.isDark(row, col) && 
                        !qrCode.isDark(row, col + 1) && 
                         qrCode.isDark(row, col + 2) && 
                         qrCode.isDark(row, col + 3) && 
                         qrCode.isDark(row, col + 4) && 
                        !qrCode.isDark(row, col + 5) && 
                         qrCode.isDark(row, col + 6) ) {
                    lostPoint += 40;
                }
            }
        }

        for (col = 0; col < moduleCount; col++) {
            for (row = 0; row < moduleCount - 6; row++) {
                if (qrCode.isDark(row, col) &&
                        !qrCode.isDark(row + 1, col) &&
                         qrCode.isDark(row + 2, col) &&
                         qrCode.isDark(row + 3, col) &&
                         qrCode.isDark(row + 4, col) &&
                        !qrCode.isDark(row + 5, col) &&
                         qrCode.isDark(row + 6, col) ) {
                    lostPoint += 40;
                }
            }
        }

        // LEVEL4
        
        var darkCount = 0;

        for (col = 0; col < moduleCount; col++) {
            for (row = 0; row < moduleCount; row++) {
                if (qrCode.isDark(row, col) ) {
                    darkCount++;
                }
            }
        }
        
        var ratio = Math.abs(100 * darkCount / moduleCount / moduleCount - 50) / 5;
        lostPoint += ratio * 10;

        return lostPoint;       
    }

};

module.exports = QRUtil;

    },
    './index': (module, require) => {
//---------------------------------------------------------------------
// QRCode for JavaScript
//
// Copyright (c) 2009 Kazuhiko Arase
//
// URL: http://www.d-project.com/
//
// Licensed under the MIT license:
//   http://www.opensource.org/licenses/mit-license.php
//
// The word "QR Code" is registered trademark of 
// DENSO WAVE INCORPORATED
//   http://www.denso-wave.com/qrcode/faqpatent-e.html
//
//---------------------------------------------------------------------
// Modified to work in node for this project (and some refactoring)
//---------------------------------------------------------------------

var QR8bitByte = require('./QR8bitByte');
var QRUtil = require('./QRUtil');
var QRPolynomial = require('./QRPolynomial');
var QRRSBlock = require('./QRRSBlock');
var QRBitBuffer = require('./QRBitBuffer');

function QRCode(typeNumber, errorCorrectLevel) {
	this.typeNumber = typeNumber;
	this.errorCorrectLevel = errorCorrectLevel;
	this.modules = null;
	this.moduleCount = 0;
	this.dataCache = null;
	this.dataList = [];
}

QRCode.prototype = {
	
	addData : function(data) {
		var newData = new QR8bitByte(data);
		this.dataList.push(newData);
		this.dataCache = null;
	},
	
	isDark : function(row, col) {
		if (row < 0 || this.moduleCount <= row || col < 0 || this.moduleCount <= col) {
			throw new Error(row + "," + col);
		}
		return this.modules[row][col];
	},

	getModuleCount : function() {
		return this.moduleCount;
	},
	
	make : function() {
		// Calculate automatically typeNumber if provided is < 1
		if (this.typeNumber < 1 ){
			var typeNumber = 1;
			for (typeNumber = 1; typeNumber < 40; typeNumber++) {
				var rsBlocks = QRRSBlock.getRSBlocks(typeNumber, this.errorCorrectLevel);

				var buffer = new QRBitBuffer();
				var totalDataCount = 0;
				for (var i = 0; i < rsBlocks.length; i++) {
					totalDataCount += rsBlocks[i].dataCount;
				}

				for (var x = 0; x < this.dataList.length; x++) {
					var data = this.dataList[x];
					buffer.put(data.mode, 4);
					buffer.put(data.getLength(), QRUtil.getLengthInBits(data.mode, typeNumber) );
					data.write(buffer);
				}
				if (buffer.getLengthInBits() <= totalDataCount * 8)
					break;
			}
			this.typeNumber = typeNumber;
		}
		this.makeImpl(false, this.getBestMaskPattern() );
	},
	
	makeImpl : function(test, maskPattern) {
		
		this.moduleCount = this.typeNumber * 4 + 17;
		this.modules = new Array(this.moduleCount);
		
		for (var row = 0; row < this.moduleCount; row++) {
			
			this.modules[row] = new Array(this.moduleCount);
			
			for (var col = 0; col < this.moduleCount; col++) {
				this.modules[row][col] = null;//(col + row) % 3;
			}
		}
	
		this.setupPositionProbePattern(0, 0);
		this.setupPositionProbePattern(this.moduleCount - 7, 0);
		this.setupPositionProbePattern(0, this.moduleCount - 7);
		this.setupPositionAdjustPattern();
		this.setupTimingPattern();
		this.setupTypeInfo(test, maskPattern);
		
		if (this.typeNumber >= 7) {
			this.setupTypeNumber(test);
		}
	
		if (this.dataCache === null) {
			this.dataCache = QRCode.createData(this.typeNumber, this.errorCorrectLevel, this.dataList);
		}
	
		this.mapData(this.dataCache, maskPattern);
	},

	setupPositionProbePattern : function(row, col)  {
		
		for (var r = -1; r <= 7; r++) {
			
			if (row + r <= -1 || this.moduleCount <= row + r) continue;
			
			for (var c = -1; c <= 7; c++) {
				
				if (col + c <= -1 || this.moduleCount <= col + c) continue;
				
				if ( (0 <= r && r <= 6 && (c === 0 || c === 6) ) || 
                     (0 <= c && c <= 6 && (r === 0 || r === 6) ) || 
                     (2 <= r && r <= 4 && 2 <= c && c <= 4) ) {
					this.modules[row + r][col + c] = true;
				} else {
					this.modules[row + r][col + c] = false;
				}
			}		
		}		
	},
	
	getBestMaskPattern : function() {
	
		var minLostPoint = 0;
		var pattern = 0;
	
		for (var i = 0; i < 8; i++) {
			
			this.makeImpl(true, i);
	
			var lostPoint = QRUtil.getLostPoint(this);
	
			if (i === 0 || minLostPoint >  lostPoint) {
				minLostPoint = lostPoint;
				pattern = i;
			}
		}
	
		return pattern;
	},
	
	createMovieClip : function(target_mc, instance_name, depth) {
	
		var qr_mc = target_mc.createEmptyMovieClip(instance_name, depth);
		var cs = 1;
	
		this.make();

		for (var row = 0; row < this.modules.length; row++) {
			
			var y = row * cs;
			
			for (var col = 0; col < this.modules[row].length; col++) {
	
				var x = col * cs;
				var dark = this.modules[row][col];
			
				if (dark) {
					qr_mc.beginFill(0, 100);
					qr_mc.moveTo(x, y);
					qr_mc.lineTo(x + cs, y);
					qr_mc.lineTo(x + cs, y + cs);
					qr_mc.lineTo(x, y + cs);
					qr_mc.endFill();
				}
			}
		}
		
		return qr_mc;
	},

	setupTimingPattern : function() {
		
		for (var r = 8; r < this.moduleCount - 8; r++) {
			if (this.modules[r][6] !== null) {
				continue;
			}
			this.modules[r][6] = (r % 2 === 0);
		}
	
		for (var c = 8; c < this.moduleCount - 8; c++) {
			if (this.modules[6][c] !== null) {
				continue;
			}
			this.modules[6][c] = (c % 2 === 0);
		}
	},
	
	setupPositionAdjustPattern : function() {
	
		var pos = QRUtil.getPatternPosition(this.typeNumber);
		
		for (var i = 0; i < pos.length; i++) {
		
			for (var j = 0; j < pos.length; j++) {
			
				var row = pos[i];
				var col = pos[j];
				
				if (this.modules[row][col] !== null) {
					continue;
				}
				
				for (var r = -2; r <= 2; r++) {
				
					for (var c = -2; c <= 2; c++) {
					
						if (Math.abs(r) === 2 || 
                            Math.abs(c) === 2 ||
                            (r === 0 && c === 0) ) {
							this.modules[row + r][col + c] = true;
						} else {
							this.modules[row + r][col + c] = false;
						}
					}
				}
			}
		}
	},
	
	setupTypeNumber : function(test) {
	
		var bits = QRUtil.getBCHTypeNumber(this.typeNumber);
        var mod;
	
		for (var i = 0; i < 18; i++) {
			mod = (!test && ( (bits >> i) & 1) === 1);
			this.modules[Math.floor(i / 3)][i % 3 + this.moduleCount - 8 - 3] = mod;
		}
	
		for (var x = 0; x < 18; x++) {
			mod = (!test && ( (bits >> x) & 1) === 1);
			this.modules[x % 3 + this.moduleCount - 8 - 3][Math.floor(x / 3)] = mod;
		}
	},
	
	setupTypeInfo : function(test, maskPattern) {
	
		var data = (this.errorCorrectLevel << 3) | maskPattern;
		var bits = QRUtil.getBCHTypeInfo(data);
        var mod;
	
		// vertical		
		for (var v = 0; v < 15; v++) {
	
			mod = (!test && ( (bits >> v) & 1) === 1);
	
			if (v < 6) {
				this.modules[v][8] = mod;
			} else if (v < 8) {
				this.modules[v + 1][8] = mod;
			} else {
				this.modules[this.moduleCount - 15 + v][8] = mod;
			}
		}
	
		// horizontal
		for (var h = 0; h < 15; h++) {
	
			mod = (!test && ( (bits >> h) & 1) === 1);
			
			if (h < 8) {
				this.modules[8][this.moduleCount - h - 1] = mod;
			} else if (h < 9) {
				this.modules[8][15 - h - 1 + 1] = mod;
			} else {
				this.modules[8][15 - h - 1] = mod;
			}
		}
	
		// fixed module
		this.modules[this.moduleCount - 8][8] = (!test);
	
	},
	
	mapData : function(data, maskPattern) {
		
		var inc = -1;
		var row = this.moduleCount - 1;
		var bitIndex = 7;
		var byteIndex = 0;
		
		for (var col = this.moduleCount - 1; col > 0; col -= 2) {
	
			if (col === 6) col--;
	
			while (true) {
	
				for (var c = 0; c < 2; c++) {
					
					if (this.modules[row][col - c] === null) {
						
						var dark = false;
	
						if (byteIndex < data.length) {
							dark = ( ( (data[byteIndex] >>> bitIndex) & 1) === 1);
						}
	
						var mask = QRUtil.getMask(maskPattern, row, col - c);
	
						if (mask) {
							dark = !dark;
						}
						
						this.modules[row][col - c] = dark;
						bitIndex--;
	
						if (bitIndex === -1) {
							byteIndex++;
							bitIndex = 7;
						}
					}
				}
								
				row += inc;
	
				if (row < 0 || this.moduleCount <= row) {
					row -= inc;
					inc = -inc;
					break;
				}
			}
		}
		
	}

};

QRCode.PAD0 = 0xEC;
QRCode.PAD1 = 0x11;

QRCode.createData = function(typeNumber, errorCorrectLevel, dataList) {
	
	var rsBlocks = QRRSBlock.getRSBlocks(typeNumber, errorCorrectLevel);
	
	var buffer = new QRBitBuffer();
	
	for (var i = 0; i < dataList.length; i++) {
		var data = dataList[i];
		buffer.put(data.mode, 4);
		buffer.put(data.getLength(), QRUtil.getLengthInBits(data.mode, typeNumber) );
		data.write(buffer);
	}

	// calc num max data.
	var totalDataCount = 0;
	for (var x = 0; x < rsBlocks.length; x++) {
		totalDataCount += rsBlocks[x].dataCount;
	}

	if (buffer.getLengthInBits() > totalDataCount * 8) {
		throw new Error("code length overflow. (" + 
            buffer.getLengthInBits() + 
            ">" +  
            totalDataCount * 8 + 
            ")");
	}

	// end code
	if (buffer.getLengthInBits() + 4 <= totalDataCount * 8) {
		buffer.put(0, 4);
	}

	// padding
	while (buffer.getLengthInBits() % 8 !== 0) {
		buffer.putBit(false);
	}

	// padding
	while (true) {
		
		if (buffer.getLengthInBits() >= totalDataCount * 8) {
			break;
		}
		buffer.put(QRCode.PAD0, 8);
		
		if (buffer.getLengthInBits() >= totalDataCount * 8) {
			break;
		}
		buffer.put(QRCode.PAD1, 8);
	}

	return QRCode.createBytes(buffer, rsBlocks);
};

QRCode.createBytes = function(buffer, rsBlocks) {

	var offset = 0;
	
	var maxDcCount = 0;
	var maxEcCount = 0;
	
	var dcdata = new Array(rsBlocks.length);
	var ecdata = new Array(rsBlocks.length);
	
	for (var r = 0; r < rsBlocks.length; r++) {

		var dcCount = rsBlocks[r].dataCount;
		var ecCount = rsBlocks[r].totalCount - dcCount;

		maxDcCount = Math.max(maxDcCount, dcCount);
		maxEcCount = Math.max(maxEcCount, ecCount);
		
		dcdata[r] = new Array(dcCount);
		
		for (var i = 0; i < dcdata[r].length; i++) {
			dcdata[r][i] = 0xff & buffer.buffer[i + offset];
		}
		offset += dcCount;
		
		var rsPoly = QRUtil.getErrorCorrectPolynomial(ecCount);
		var rawPoly = new QRPolynomial(dcdata[r], rsPoly.getLength() - 1);

		var modPoly = rawPoly.mod(rsPoly);
		ecdata[r] = new Array(rsPoly.getLength() - 1);
		for (var x = 0; x < ecdata[r].length; x++) {
            var modIndex = x + modPoly.getLength() - ecdata[r].length;
			ecdata[r][x] = (modIndex >= 0)? modPoly.get(modIndex) : 0;
		}

	}
	
	var totalCodeCount = 0;
	for (var y = 0; y < rsBlocks.length; y++) {
		totalCodeCount += rsBlocks[y].totalCount;
	}

	var data = new Array(totalCodeCount);
	var index = 0;

	for (var z = 0; z < maxDcCount; z++) {
		for (var s = 0; s < rsBlocks.length; s++) {
			if (z < dcdata[s].length) {
				data[index++] = dcdata[s][z];
			}
		}
	}

	for (var xx = 0; xx < maxEcCount; xx++) {
		for (var t = 0; t < rsBlocks.length; t++) {
			if (xx < ecdata[t].length) {
				data[index++] = ecdata[t][xx];
			}
		}
	}

	return data;

};

module.exports = QRCode;

    }
  };
  const cache = new Map();
  function require(name) {
    if (cache.has(name)) return cache.get(name).exports;
    const module = {exports:{}};
    cache.set(name,module);
    modules[name](module,require);
    return module.exports;
  }
  return require('./index');
})();

const app = document.querySelector('#app');
const letters = ['א׳','ב׳','ג׳','ד׳'];
const storageKey = 'technoda-hanukkah-live-session';
const quizUrl = new URL('./',document.currentScript.src);
const pagesOrigin = 'https://technodahadera.github.io';
const apiOrigin = location.origin === pagesOrigin ? 'https://technoda-hanukkah-quiz.workspace-022996.chatgpt.site' : '';
const assetsUrl = location.origin === pagesOrigin ? quizUrl : new URL('/technoda-hanukkah-quiz/',pagesOrigin);
const musicUrl = new URL('answer-music.mp3',assetsUrl);
const roundSeconds = 30;
const artwork = Array.from({length:3},(_,i) => new URL('question-art-' + (i+1) + '.webp',assetsUrl));
const currentUrl = new URL(location.href);
const requestedPlay = currentUrl.searchParams.get('play') ?? '';
const joinPage = location.pathname === '/join' || currentUrl.searchParams.has('play');
const hostPage = !joinPage;
let session;
let state;
let poll;
let clock;
let status;
let busy = false;
let pendingChoice = null;
let connectionIssue = '';
let offset = 0;
let bank;
let audioContext;
let audioBuffer;
let audioTrack;
let trackRound;
let muted = false;
let musicButton;

function prepareMusic() {
  if (muted) return;
  try {
    audioContext ??= new AudioContext();
    void audioContext.resume().then(syncMusic).catch(() => {});
    audioBuffer ??= fetch(musicUrl).then(response => {
      if (!response.ok) throw new Error('Music unavailable');
      return response.arrayBuffer();
    }).then(buffer => audioContext.decodeAudioData(buffer)).catch(() => {
      audioBuffer = undefined;
      return null;
    });
  } catch { /* gameplay remains available when browser audio is disabled */ }
}

function stopMusic() {
  if (audioTrack) {
    audioTrack.stop();
    audioTrack = undefined;
  }
  trackRound = undefined;
}

function syncMusic() {
  if (muted || session?.role !== 'host' || state?.phase !== 'question') {
    stopMusic();
    return;
  }
  if (!audioBuffer || audioContext?.state !== 'running' || trackRound === state.index) return;
  const index = state.index;
  const active = session;
  void audioBuffer.then(buffer => {
    if (!buffer || muted || active !== session || state?.phase !== 'question' ||
        state.index !== index || trackRound === index || audioContext.state !== 'running') return;
    const seconds = Math.min(roundSeconds,(state.ends-Date.now()-offset)/1000);
    if (seconds <= 0) return;
    stopMusic();
    trackRound = index;
    const track = audioContext.createBufferSource();
    track.buffer = buffer;
    track.loop = true;
    track.connect(audioContext.destination);
    const played = index * roundSeconds + (roundSeconds - seconds);
    track.start(0,played % buffer.duration);
    track.stop(audioContext.currentTime + seconds);
    track.onended = () => {
      if (audioTrack === track) audioTrack = undefined;
    };
    audioTrack = track;
  });
}


function node(tag,className = '',content = '') {
  const element = document.createElement(tag);
  element.className = className;
  element.textContent = content;
  return element;
}
function button(text,onClick,style = '') {
  const element = node('button','btn '+style,text);
  element.type = 'button';
  if (onClick) element.addEventListener('click',onClick);
  return element;
}
function link(title,path) {
  const element = node('a','',title);
  element.href = path;
  return element;
}
function field(title,options = {}) {
  const label = node('label','',title);
  const input = Object.assign(node('input'),options);
  label.append(input);
  return {label,input};
}
function focus(element) {
  element.tabIndex = -1;
  element.focus({preventScroll:true});
}
function errorText(error) {
  return error.status ? error.message : 'החיבור נותק. מנסים להתחבר שוב.';
}
async function api(action,payload) {
  const response = await fetch(apiOrigin + '/api/' + action, {
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify(payload),
    signal:AbortSignal.timeout(8000)
  });
  const result = await response.json();
  if (!response.ok) throw Object.assign(new Error(result.error),{status:response.status});
  return result;
}
function saveSession(info) {
  session = info;
  try { sessionStorage.setItem(storageKey,JSON.stringify(info)); } catch { /* session still works in memory */ }
}
function stopSession() {
  stopMusic();
  musicButton.hidden = true;
  clearTimeout(poll);
  clearInterval(clock);
  session = undefined;
  state = undefined;
  try { sessionStorage.removeItem(storageKey); } catch { /* storage can be unavailable */ }
}
function setup(failure = '') {
  clearInterval(clock);
  const hero = node('section','hero');
  const copy = node('div','hero-copy');
  copy.append(node('h1','','חידון חנוכה'),node('p','muted','27 שאלות · 30 שניות לכל שאלה'));
  const art = node('div','hero-art');
  art.setAttribute('aria-hidden','true');
  const lights = node('div','lights');
  for (let i=0; i<9; i++) lights.append(node('span','candle'));
  art.append(lights);
  hero.append(copy,art);

  const modes = node('div','live-types');
  if (!joinPage) modes.append(hostSetup());
  if (!hostPage) modes.append(joinSetup());
  const warning = node('p','note',failure);
  warning.hidden = !failure;
  app.replaceChildren(hero,warning,modes);
}
function hostSetup() {
  const panel = node('section','card stack');
  const output = node('p','muted game-status');
  output.setAttribute('role','status');
  const open = button('פתיחת משחק',async () => {
    prepareMusic();
    open.disabled = true;
    output.textContent = 'פותחים משחק…';
    try {
      const questions = await loadBank();
      const data = await api('create',{key:questions.map(q => q.correct)});
      saveSession({code:data.code,token:data.token,role:'host'});
      acceptState(data.state);
      refresh();
    } catch (error) {
      output.textContent = errorText(error);
      open.disabled = false;
    }
  },'primary');
  const details = node('details');
  details.append(node('summary','','מפתח תשובות והערות למורה'));
  details.addEventListener('toggle',async () => {
    if (!details.open || details.children.length > 1) return;
    const list = node('div','key-list','טוענים את המפתח…');
    details.append(list);
    try {
      const questions = await loadBank();
      list.textContent = '';
      questions.forEach((q,index) => {
        const card = node('section','key-item');
        const answers = node('div','key-options');
        const scoring = node('span','muted',q.correct.length ? '' : 'ללא ניקוד');
        q.choices.forEach((choice,i) => {
          const label = node('label',q.correct.includes(i) ? 'key-green' : '');
          const check = node('input');
          check.type = 'checkbox';
          check.checked = q.correct.includes(i);
          check.addEventListener('change',() => {
            q.correct = check.checked ? [...q.correct,i] : q.correct.filter(value => value !== i);
            label.classList.toggle('key-green',check.checked);
            scoring.textContent = q.correct.length ? '' : 'ללא ניקוד';
          });
          label.append(check,document.createTextNode(choice));
          answers.append(label);
        });
        card.append(node('strong','',(index + 1) + '. ' + q.title),answers,scoring);
        if (q.note) card.append(node('p','note',q.note));
        list.append(card);
      });
    } catch (error) {
      list.remove();
      output.textContent = errorText(error);
    }
  });
  panel.append(node('h2','','הנחיית משחק'),node('p','muted','פתחו משחק במחשב והקרינו את ה־QR להצטרפות.'),open,details,output);
  return panel;
}
async function loadBank() {
  if (!bank) {
    const response = await fetch(apiOrigin + '/api/questions');
    if (!response.ok) throw new Error('Question bank unavailable');
    bank = await response.json();
  }
  return bank;
}
function joinSetup() {
  const panel = node('form','card stack');
  if (!/^[a-f0-9]{32}$/.test(requestedPlay)) {
    panel.append(node('h2','','הצטרפות מהטלפון'),
      node('p','muted','סרקו את ה־QR שהמנחה מקרין כדי להצטרף למשחק.'));
    return panel;
  }
  const name = field('כינוי',{maxLength:24,placeholder:'איך תרצו להופיע במשחק?',required:true,autocomplete:'off'});
  const action = button('הצטרפות למשחק',null,'primary');
  action.type = 'submit';
  const output = node('p','muted game-status');
  output.setAttribute('role','status');
  let identity;
  panel.addEventListener('submit',async event => {
    event.preventDefault();
    if (action.disabled) return;
    action.disabled = true;
    output.textContent = 'מתחברים…';
    identity ??= crypto.randomUUID();
    const play = requestedPlay;
    const token = identity;
    try {
      const data = await api('join',{code:play,name:name.input.value,token});
      saveSession({code:play,token,role:'player'});
      acceptState(data.state);
      refresh();
    } catch (error) {
      output.textContent = errorText(error);
      action.disabled = false;
    }
  });
  panel.append(node('h2','','הצטרפות מהטלפון'),name.label,action,output);
  return panel;
}
function acceptState(fresh) {
  if (state) {
    const phaseOrder = {lobby:0,question:1,reveal:2,done:3};
    if (fresh.index < state.index ||
        (fresh.index === state.index && phaseOrder[fresh.phase] < phaseOrder[state.phase]) ||
        fresh.now < state.now) return;
  }
  const before = state;
  offset = fresh.now - Date.now();
  state = fresh;
  syncMusic();
  if (!before || before.index !== fresh.index || fresh.pick != null || fresh.phase !== 'question') pendingChoice = null;
  const fingerprint = view => JSON.stringify({...view,now:0});
  if (!before || fingerprint(before) !== fingerprint(fresh) || connectionIssue) {
    connectionIssue = '';
    render(!before || before.phase !== fresh.phase || before.index !== fresh.index);
  }
}
async function refresh() {
  const active = session;
  if (!active) return;
  try {
    const data = await api('state',active);
    if (session !== active) return;
    acceptState(data.state);
  } catch (error) {
    if (session !== active) return;
    if ([401,404].includes(error.status)) {
      stopSession();
      setup(errorText(error));
      return;
    }
    if (!connectionIssue) setStatus(errorText(error));
    connectionIssue = errorText(error);
  }
  if (session === active && (state?.phase !== 'done' || connectionIssue)) poll = setTimeout(refresh,1150);
}
function setStatus(text) {
  if (status) status.textContent = text;
}
async function send(action,payload) {
  if (busy) return;
  if (action === 'advance') prepareMusic();
  busy = true;
  const active = session;
  const index = state.index;
  if (action === 'answer') {
    pendingChoice = payload.choice;
    render(false);
  }
  try {
    const data = await api(action,{...active,index,...payload});
    if (session === active) acceptState(data.state);
  } catch (error) {
    if (session === active && state.index === index) {
      pendingChoice = null;
      busy = false;
      render(false);
      setStatus(errorText(error));
    }
  } finally {
    busy = false;
    if (session === active && state?.phase === 'question' && pendingChoice === null) {
      const controls = app.querySelectorAll('.answer');
      controls.forEach(control => { control.disabled = session.role === 'host' || state.pick != null || remaining() <= 0; });
    }
  }
}
function remaining() {
  return Math.max(0,Math.ceil((state.ends-Date.now()-offset)/1000));
}
function tick(time,bar,answerGrid) {
  const value = remaining();
  time.textContent = value ? value + ' שניות' : 'הזמן נגמר';
  bar.style.width = (value/roundSeconds*100) + '%';
  if (!value) answerGrid.querySelectorAll('button').forEach(control => { control.disabled = true; });
}
function render(shouldFocus) {
  clearInterval(clock);
  status = node('p','muted game-status');
  status.setAttribute('role','status');
  const screen = node('section','card stack');
  const isHost = session.role === 'host';
  musicButton.hidden = !isHost;
  let heading;
  if (state.phase === 'lobby') {
    heading = node('h1','',isHost ? 'מצטרפים למשחק' : 'הצטרפת למשחק!');
    screen.append(heading);
    if (isHost) lobby(screen);
    else screen.append(node('p','muted',state.name + ' · ממתינים שהמנחה יתחיל'));
  } else if (state.phase === 'done') {
    heading = node('h1','','תוצאות החידון');
    screen.append(heading);
    if (!isHost) screen.append(node('h2','',state.score + ' נקודות'));
    screen.append(ranking(state.ranking));
  } else {
    heading = showRound(screen,isHost);
  }
  const footer = node('div','actions');
  footer.append(button(state.phase === 'done' ? 'חזרה למסך הפתיחה' : 'יציאה מהמשחק',() => {
    if (state.phase !== 'done' && !confirm('לצאת מהמשחק?')) return;
    stopSession();
    setup();
  },'subtle'));
  if (!isHost && state.phase !== 'lobby') footer.append(node('p','muted',state.name + ' · ' + state.score + ' נקודות'));
  screen.append(status,footer);
  app.replaceChildren(screen);
  if (shouldFocus) focus(heading);
}
function createQr(url) {
  const qr = new QRCode(-1,0);
  qr.addData(url);
  qr.make();
  const canvas = node('canvas','qr-canvas');
  const side = qr.getModuleCount();
  const padding = 4;
  const scale = 8;
  canvas.width = canvas.height = (side + 2*padding)*scale;
  canvas.setAttribute('role','img');
  canvas.setAttribute('aria-label','QR להצטרפות למשחק');
  const context = canvas.getContext('2d');
  context.fillStyle = '#fff';
  context.fillRect(0,0,canvas.width,canvas.height);
  context.fillStyle = '#101019';
  for (let row=0; row<side; row++) {
    for (let col=0; col<side; col++) {
      if (qr.isDark(row,col)) context.fillRect((col+padding)*scale,(row+padding)*scale,scale,scale);
    }
  }
  return canvas;
}
function lobby(screen) {
  screen.classList.add('lobby');
  const joinUrl = new URL(quizUrl);
  joinUrl.searchParams.set('play',session.code);
  const share = node('div','actions');
  const joinLink = link('קישור להצטרפות',joinUrl.href);
  joinLink.target = '_blank';
  joinLink.rel = 'noopener';
  share.append(joinLink,button('העתקת קישור',async () => {
    try {
      await navigator.clipboard.writeText(joinUrl.href);
      setStatus('הקישור הועתק.');
    } catch { setStatus(joinUrl.href); }
  },'subtle'));
  const players = node('div','scoreline');
  state.names.forEach(name => players.append(node('span','chip',name)));
  const start = button('התחלת משחק',() => send('advance',{}),'primary');
  start.disabled = state.players === 0;
  const overview = node('div','join-lobby');
  const panel = node('div','stack');
  panel.append(node('h2','','סרקו כדי להצטרף'),share,
    node('p','muted',state.players + ' משתתפים'),players,start);
  overview.append(createQr(joinUrl.href),panel);
  screen.append(overview);
}
function ranking(entries) {
  const list = node('ol','score-rank');
  for (const item of entries) {
    const row = node('li','',item.name);
    row.append(node('span','',String(item.score)));
    list.append(row);
  }
  return list;
}
function questionArtwork(index) {
  const image = node('div','question-art');
  const cell = index % 9;
  image.setAttribute('aria-hidden','true');
  image.style.backgroundImage = 'url("' + artwork[Math.floor(index/9)] + '")';
  image.style.backgroundPosition = (cell % 3) * 50 + '% ' + Math.floor(cell/3) * 50 + '%';
  return image;
}
function showRound(screen,isHost) {
  const revealed = state.phase === 'reveal';
  const q = state.question;
  const heading = node('h1','prompt',q.title);
  const equation = 'x^x = 25';
  if (q.title.includes(equation)) {
    const start = q.title.indexOf(equation);
    heading.replaceChildren(document.createTextNode(q.title.slice(0,start)),
      node('bdi','math',equation),document.createTextNode(q.title.slice(start+equation.length)));
  }
  const meta = node('div','meta');
  const time = node('span','count timer');
  meta.append(node('p','muted','שאלה ' + (state.index+1) + ' מתוך ' + state.total));
  if (isHost) meta.append(node('p','muted',state.answered + ' מתוך ' + state.players + ' ענו'));
  if (!revealed) meta.append(time);
  const track = node('div','track');
  const bar = node('span');
  track.setAttribute('aria-hidden','true');
  track.append(bar);
  const grid = node('div','answers');
  q.choices.forEach((choice,i) => {
    const answer = node('button','answer');
    answer.type = 'button';
    const selected = (state.pick ?? pendingChoice) === i;
    const correct = revealed && state.correct.includes(i);
    answer.append(node('span','letter',correct ? '✓' : letters[i]));
    if (q.kind === 'colors' && /^[0-9a-f]{6}$/i.test(choice)) {
      const swatch = node('span','swatch');
      swatch.style.backgroundColor = '#' + choice;
      swatch.setAttribute('aria-hidden','true');
      answer.append(swatch);
    }
    if (q.kind === 'images') {
      const img = node('img');
      img.alt = choice + ' — ' + ['אזור עור אחיד','אזור עור עם נקודה כהה אחת','אזור עור עם נקודות קטנות רבות בגוון חום בהיר','אזור עור עם קווים בהירים'][i];
      img.src = skinSamples[i];
      answer.append(img);
    } else {
      const label = node('span','',choice);
      if (q.kind === 'colors') label.dir = 'ltr';
      answer.append(label);
    }
    if (revealed && isHost) answer.append(node('span','chip',String(state.counts[i])));
    if (correct) answer.classList.add('correct');
    if (selected) answer.classList.add('selected');
    answer.setAttribute('aria-pressed',String(selected));
    answer.disabled = isHost || revealed || state.pick != null || pendingChoice !== null;
    answer.addEventListener('click',() => send('answer',{choice:i}));
    grid.append(answer);
  });
  screen.classList.toggle('player-question',!isHost);
  screen.append(meta);
  if (!revealed) screen.append(track);
  const prompt = node('div','question-layout');
  prompt.append(heading,questionArtwork(state.index));
  screen.append(prompt,grid);
  if (!revealed) {
    if (state.pick != null) screen.append(node('p','muted','התשובה נשלחה. ממתינים לסיום הזמן.'));
    if (pendingChoice !== null) screen.append(node('p','muted','שולחים את התשובה…'));
    tick(time,bar,grid);
    clock = setInterval(() => tick(time,bar,grid),200);
    return heading;
  }
  const scoring = state.correct.length > 0;
  if (!scoring) screen.append(node('p','muted','השאלה הזו ללא ניקוד.'));
  if (scoring && !isHost) {
    const result = state.points ? 'תשובה נכונה! קיבלת ' + state.points + ' נקודות.'
      : state.pick == null ? 'לא נשלחה תשובה.' : 'התשובה הנכונה מסומנת בירוק.';
    screen.append(node('p',state.points ? 'feedback good' : 'muted',result));
  }
  if (state.note) screen.append(node('p','note',state.note));
  if (isHost) {
    screen.append(node('h2','','מובילים'),ranking(state.ranking));
    const final = state.index+1 === state.total;
    screen.append(button(final ? 'לתוצאות הסופיות' : 'לשאלה הבאה',() => send('advance',{}),'primary'));
  }
  return heading;
}

const fullscreen = document.querySelector('#fullscreen');
musicButton = button('השתקת מוזיקה',() => {
  muted = !muted;
  musicButton.textContent = muted ? 'הפעלת מוזיקה' : 'השתקת מוזיקה';
  if (muted) stopMusic();
  else prepareMusic();
},'subtle');
musicButton.hidden = true;
fullscreen.before(musicButton);
if (!document.fullscreenEnabled || joinPage) fullscreen.hidden = true;
fullscreen.addEventListener('click',async () => {
  try {
    if (document.fullscreenElement) await document.exitFullscreen();
    else await document.documentElement.requestFullscreen();
  } catch { fullscreen.textContent = 'מסך מלא אינו זמין כאן'; }
});
document.addEventListener('fullscreenchange',() => {
  fullscreen.textContent = document.fullscreenElement ? 'יציאה ממסך מלא' : 'מסך מלא';
});
try {
  const saved = JSON.parse(sessionStorage.getItem(storageKey));
  if (saved && (!joinPage || (saved.role === 'player' && saved.code === requestedPlay)) &&
      (!hostPage || saved.role === 'host')) session = saved;
} catch { /* start a new session */ }
setup();
const firstArtwork = new Image();
firstArtwork.src = artwork[0];
if (session) refresh();
