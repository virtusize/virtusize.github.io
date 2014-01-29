#!/usr/bin/python
# -*- coding: utf-8 -*-

from setuptools import setup, find_packages
setup(

    name='vs-docs',
    version='1.0.0',
    packages=find_packages(),

    install_requires=[
        'sphinx',
        'sphinx_rtd_theme',
        'sphinxcontrib.gist',
        'sphinx-intl'
    ]
)
