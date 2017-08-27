from django import template
from django.contrib.humanize.templatetags.humanize import intcomma
from django.forms import CheckboxInput

register = template.Library()


@register.filter
def addclass(field, css):
    field.field.widget.attrs['class'] = u'{0} {1}'.format(field.field.widget.attrs.get('class', ''), css)
    return field


@register.filter
def setplaceholder(field, placeholder):
    return field.as_widget(attrs={'placeholder': placeholder})


@register.filter
def set_data_placeholder(field, placeholder):
    return field.as_widget(attrs={'data-placeholder': placeholder})


@register.filter
def is_checkbox(field):
  return field.field.widget.__class__.__name__ == CheckboxInput().__class__.__name__


@register.filter
def currency(value):
    value = round(float(value), 2)
    return '%s,%s' % (intcomma(int(value)), ('%0.2f' % value)[-2:])
