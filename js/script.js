/* call some data-attribute-based widgets */
$(function(){
	$('*[data-widget="menubar"]').menubar();
	$('*[data-icon]').each(function(){
		$(this).icon({icon : $(this).attr('data-icon')});
	});
	$('*[data-widget="toolbar"]').toolbar();
});























