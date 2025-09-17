from django.core.management.base import BaseCommand, CommandError
from django.contrib.auth import get_user_model

User = get_user_model()

class Command(BaseCommand):
    help = 'Delete a user by username or full name'

    def add_arguments(self, parser):
        parser.add_argument('--username', type=str, help='Username of the user to delete')
        parser.add_argument('--full_name', type=str, help='Full name (first_name last_name) of the user to delete')

    def handle(self, *args, **options):
        username = options.get('username')
        full_name = options.get('full_name')

        if username:
            try:
                user = User.objects.get(username=username)
            except User.DoesNotExist:
                raise CommandError(f'User with username "{username}" does not exist.')
        elif full_name:
            first_name, last_name = full_name.split(' ', 1)
            try:
                user = User.objects.get(first_name=first_name, last_name=last_name)
            except User.DoesNotExist:
                raise CommandError(f'User with name "{full_name}" does not exist.')
        else:
            raise CommandError('Please provide either --username or --full_name.')

        user.delete()
        self.stdout.write(self.style.SUCCESS(f'User "{user.username}" deleted successfully.'))
