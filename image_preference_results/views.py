from django.views.generic.base import TemplateView

from image_preference_results.utilities import get_firebase


class Home(TemplateView):
    template_name = 'pages/home.html'

    def get_context_data(self, **kwargs):
        firebase = get_firebase()
        auth = firebase.auth()
        firebase_user = auth.sign_in_with_email_and_password('leon9894@gmail.com', 'Leonardo0321')
        context = super(Home, self).get_context_data(**kwargs)
        firebase = get_firebase()
        db = firebase.database()
        token = firebase_user['idToken']
        data = db.child("preferences").get(token)
        data = data.val() or []
        preferences = []
        total_categories = {}
        for username, d in data.items():
            categories = self.get_categories(d.get('categories'))
            preferences.append({
                'username': username,
                'name': d.get('name'),
                'categories': categories,
            })
            for key, value in d.get('categories').items():
                if total_categories.get(key):
                    total_categories[key] += value
                else:
                    total_categories[key] = value
        context['total_categories'] = self.get_categories(total_categories)
        context['preferences'] = preferences
        return context

    def get_categories(self, categories):
        data = []
        for key, value in categories.items():
            data.append({
                'category': key,
                'selected': value,
            })
        return data
