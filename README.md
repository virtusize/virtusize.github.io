Virtusize developer docs
========================

To generate the docs and push them to the master branch on Github do

    make gh-pages


To build the html in the develop branch for testing before publishing it:

    make html


The Makefile target was derived from http://blog.nikhilism.com/2012/08/automatic-github-pages-generation-from.html


## How to translate

Full documentation of sphinx's internationalization can be found here: http://sphinx-doc.org/latest/intl.html

From root dir run:

    make gettext

This will extract new messages from the documentation and generate new .pot files in ./build/locale.

Change directory into source:

    cd source

Then run with the correct language code you are targetting. There may be
multiple "-l <lang-code>" directives. This command can be run multiple times.
It updates the files, if there have been additions to the documentation:

    sphinx-intl update -p ../build/locale -l ja

    # or like this: 

    sphinx-intl update -p ../build/locale -l ja -l de


Go back to the root directory.

    cd ..

From the root directory you can run the following command to build the .mo
files, after translating:

    sphinx-intl build

Now you are able to build the documentation in a specific language, like this:

    make -e SPHINXOPTS="-D language='ja'" html

If you include a new language, the Makefile has to be changed to include the
language in the gh-pages section.
