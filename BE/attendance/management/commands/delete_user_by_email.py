from django.core.management.base import BaseCommand, CommandError
from django.contrib.auth import get_user_model

User = get_user_model()

class Command(BaseCommand):
    help = 'Delete a user by email address'

    def add_arguments(self, parser):
        parser.add_argument('--email', type=str, required=True, help='Email of the user to delete')

    def handle(self, *args, **options):
        email = options.get('email')
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            raise CommandError(f'User with email "{email}" does not exist.')
        user.delete()
        self.stdout.write(self.style.SUCCESS(f'User with email "{email}" deleted successfully.'))
