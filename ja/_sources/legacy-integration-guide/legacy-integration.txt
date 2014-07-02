Integration v2
==============

.. note::
    This integration version is out of date. Please use the new integration v3
    or upgrade your old integration v2. See: :ref:`label-integration-v3` or
    follow our :ref:`label-upgrade-guide`.

**Dependencies**

At this moment, the integration has only one dependency, jQuery 1.3 or later.
If jQuery is not found on the page, the integration script will asynchronously
load jQuery from the Google CDN (this will not slow down the page as it is done
asynchronously and most clients already have it cached).

**Asynchronous loading**

All script loading is done asynchronously, minimizing the impact on the load
speed of the product page. The integration snippet is inspired by the
asynchronous loading done by Google Analytics, FB Connect, Google+ and others.
In the unlikely event of Virtusize servers experiencing down time, the product
page will not be impacted other than that the button won't show.

.. _label-single-product-integration:

Single Product Integration
--------------------------

Embedding the integration snippet
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. highlight:: html

Integrating the Virtusize Widget requires embedding an integration
script on the product page. The code is very similar to Google Analytics
or Facebook Connect.

::

  <script type="text/javascript">
    /*** Virtusize Widget parameters and initialization ***/
    window.vsWidgetAsyncInit = function(vsWidget) {

      vsWidget.setApiKey("0000000000000000000000000000000000000000");
      vsWidget.setProductId("PRODUCT_ID");

    };

    /*** Do not change anything below this line!    ***/
    /*** This will load the Virtusize widget script ***/
    (function(d, s){
      var fS = d.getElementsByTagName(s)[0], sE = d.createElement(s),
          p = "https:" == d.location.protocol ? "https://" : "http://cdn.";
      sE.async = true; sE.type = "text/javascript";
      sE.src = p + "api.virtusize.com/api/vs-widget/v2/vs-widget.js";
      fS.parentNode.insertBefore(sE, fS);
    }(document, "script"));
  </script>


.. note::
    Line 5 defines an API key to use. The value within quotes should
    be your actual API key that you get when you sign up for Virtusize.


Positioning the button
^^^^^^^^^^^^^^^^^^^^^^

The position of the button is configured by including an empty div
element with id "#vs-widget-button-container" anywhere on the product
page.

::

    <div id="vs-widget-button-container"></div>


The button will be created inside the #vs-widget-button-container
element. The integration script is responsible for creating the button.

For the standard integration, the measurements are provided to Virtusize via
the Virtusize admin interface (see :ref:`label-providing-measurements`), and
the integration snippet only needs the unique product ID to identify what
measurements to use.  That is what line 6 does. The value ``PRODUCT_ID`` should
be the actual identifier of the product.

.. note::
    For best results, the product id should be an identifier that
    identifies the product regardless of size and color.

No button will be visible on the product page until the integration snippet can
find the measurements for the product (until they are provided to Virtusize via
our admin or via the measurements feed).


Multiple Product Integration
----------------------------

It is possible to have widget buttons for more than one product per page. This
is needed for "Buy-this-outfit" kind of pages, for example.

The integration is very similiar to the one for single product pages.  All you
have to do, is supply the product ids and corresponding button position
strategies, to indicate, which button is used for which product.

The ``vsWidgetAsyncInit`` variable, that is a function in the single product
case, also accepts an array of functions.

.. highlight:: javascript

::

    window.vsWidgetAsyncInit = [];
    window.vsWidgetAsyncInit.push(function(vsWidget) {

      vsWidget.setApiKey("0000000000000000000000000000000000000000");
      vsWidget.setProductId("12345678");
      vsWidget.setButtonPositionStrategy(function($) {
        return $('#button-container-12345678');
      });
        
    });


Make sure the products exist in the Virtusize database and the button
containers containers exist on your page.


Using a custom button
---------------------

You can use any DOM element on your website as the Virtusize button.
This gives you full control over the design of the button.

The Virtusize integration script still performs all product data and
environment checks prior to showing the button. The button will behave
the same way as the default one.

.. note::
    The button will be set to ``visibility: hidden;`` on load. Only when all
    checks pass will the button be shown. To prevent some flickering that may
    occur you can set the initial visibility of the button to hidden.


Example integration:
^^^^^^^^^^^^^^^^^^^^

::

    /*** Virtusize Widget parameters and initialization ***/
    window.vsWidgetAsyncInit = function(vsWidget) {
     
      vsWidget.setApiKey("0000000000000000000000000000000000000000");
      vsWidget.setProductId("PRODUCT_ID");
      vsWidget.setButton("#dom-button-id");
     
    };


Here the convenience method ``setButton(…)`` is used. To find out what other
methods exist on the VirtusizeWidget object, go to :ref:`label-javascript-api`.


Staging Environment
-------------------

We have a staging environment that can be used during the development
and testing phase. Just point the integration script to:

::

    staging.virtusize.com

instead of:

::

    api.virtusize.com


Here is a sample how to configure this so the environment is controlled
by a variable::

    window.vsStaging = true;

    (function(d, s){
      var fS = d.getElementsByTagName(s)[0], sE = d.createElement(s),
          p = "https:" == d.location.protocol ? "https://" : "http://cdn.",
          env = window.vsStaging ? "staging" : "api";
      sE.async = true; sE.type = "text/javascript";
      sE.src = p + env + ".virtusize.com/api/vs-widget/v2/vs-widget.js";
      fS.parentNode.insertBefore(sE, fS);
    }(document, "script"));



Troubleshooting
---------------

Verifying integration
^^^^^^^^^^^^^^^^^^^^^

To check if the integration is successful or not, navigate your browser
to a product page. Append the string ``#hasVsWidget?`` to the url in the
address bar.

For example:

.. highlight:: html

::

    http://www.example.com/products/28657

becomes:

::

    http://www.example.com/products/28657#hasVsWidget?

Press the enter-key to confirm and then hit the reload button on the
browser to reload the page. If the integration was successful, you will
get a popup indicating precisely that.

Button not showing
^^^^^^^^^^^^^^^^^^

The button is only shown, if there is a valid product found in the
Virtusize database or supplied in any other way. Make sure that there is
a valid product.

