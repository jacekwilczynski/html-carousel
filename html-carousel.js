function nestElement(parent, childPropertyName, childTagName) {
	var el = document.createElement(childTagName);
	parent[childPropertyName] = el;
	parent.appendChild(el);
	return el;
}

function nestElements(parent, childPropertyNames, childTagNames) {
	if (childPropertyNames.length !== childTagNames.length) return;
	for (var i = 0; i < childPropertyNames.length; i++)
		nestElement(parent, childPropertyNames[i], childTagNames[i]);
}

function expandCarousel(source) {
	source.items = document.querySelectorAll('#' + source.id + ' > item');
	var itemCount = source.items.length;

	var target = document.createElement('div');
	target.id = source.id;
	target.classList.add('carousel', 'slide');
	target.dataset.ride = 'carousel';
	nestElements(target, ['ol', 'inner', 'prev', 'next'], ['ol', 'div', 'a', 'a']);

	target.ol.classList.add('carousel-indicators');
	target.inner.classList.add('carousel-inner');
	target.inner.setAttribute('role', 'listbox');
	for (var i = 0; i < itemCount; i++) {
		var li = nestElement(target.ol, 'item' + i, 'li');
		li.dataset.target = '#' + target.id;
		li.dataset.slideTo = i;
		var div = nestElement(target.inner, 'item' + i, 'div');
		div.classList.add('item');
		div.innerHTML = source.items[i].innerHTML;
	}
	target.ol.item0.classList.add('active');
	target.inner.item0.classList.add('active');

	for (var e in {'prev': target.prev, 'next': target.next}) {
		var te = target[e];
		te.href = '#' + target.id;
		te.dataset.slide = e;
		te.setAttribute('role', 'button');
		nestElements(te, ['glyph', 'txt'], ['span', 'span']);
		te.glyph.setAttribute('aria-hidden', 'true');
		te.txt.classList.add('sr-only');
	}
	target.prev.classList.add('left', 'carousel-control');
	target.next.classList.add('right', 'carousel-control');
	target.prev.glyph.classList.add('glyphicon', 'glyphicon-chevron-left');
	target.next.glyph.classList.add('glyphicon', 'glyphicon-chevron-right');
	target.prev.txt.innerHTML = 'Previous';
	target.next.txt.innerHTML = 'Next';

	source.parentNode.replaceChild(target, source);
}

var carousels = document.querySelectorAll('carousel');
carousels.forEach(expandCarousel);