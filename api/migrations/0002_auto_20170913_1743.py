# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2017-09-13 17:43
from __future__ import unicode_literals

import json
from django.db import migrations
from api.models import Case


class Migration(migrations.Migration):

    def load_cases(apps, schema_editor):

        with open('api/fixtures/cases.json') as data_file:    
            data = json.load(data_file)

            for case in data:
                Case.objects.create(**case)


    def delete_cases(apps, schema_editor):
        Case.objects.all().delete()

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(load_cases, delete_cases)
    ]
