.. _label-product-page-integration:

Product Page Integration
========================

On your product pages: add an HTML snippet for the Virtusize button and add the
Virtusize script that enables the Virtusize widget, activated by the button.


.. _label-virtusize-button:

Virtusize button
----------------

The HTML snippet for the Virtusize button should be included on the product page
and position the button closely to the size selector. We can provide a few
responsive buttons, with different designs that would suit your page style.

The element you create should not be visible when the page loads; it will
automatically be shown when there is a valid product in the Virtusize database.
Set the button style to ``visibility:hidden``, to ``display:none`` or both. Upon show,
the button style will change to ``visibility:visible`` and ``display:block``.

.. note::
    A responsive `sample button <http://codepen.io/virtusize/pen/xVNrZP/?editors=1100>`_
    is available for use. If you want to create your own button, see our
    `list of resources <https://github.com/virtusize/virtusize.github.io/tree/master/resources/logos>`_.


.. _label-integrating-javaScript-snippet:

Integrating JavaScript Snippet
------------------------------

The integration snippet should be included on the product page just before the
closing ``</body>`` tag. This ensures minimal impact on the page load speed. The
code is similar to Google Analytics or Facebook Connect.

Before inserting the snippet, you need to define the following items:

1. The API key for your store - `contact our sales team <sales@virtusize.com>`__.
2. The Product ID - see :ref:`label-setting-the-product-id`.
3. The Product Image URL - see :ref:`label-setting-the-product-image-url`.
4. The CSS selector - see :ref:`label-setting-the-css-selector`.
5. Enabling the Purchase History Preview Tooltip - see :ref:`label-phpv-tooltip`.

The simplest way to integrate is:

.. code-block:: html
   :linenos:

    <!-- Virtusize Integration -->
    <script>
    !(function(a,d,e,b){var f;a.Virtusize=b;a[b]=a[b]||[];a[b].env=null!=a.vsEnv?a.vsEnv:"production";a[b].url=null!=a.vsUrl?a.vsUrl:a.location.host;a.vsEnv=void 0;a.vsUrl=void 0;a[b].methods="setApiKey setRegion setLanguage setWidgetOverlayColor addWidget ready setMobile on setAvailableSizes setSizeAliases addOrder addFindByFit setUserId".split(" ");a[b].factory=function(c){return function(){var d=Array.prototype.slice.call(arguments);d.unshift(c);a[b].push(d);return a[b]}};var g=a[b].methods;var c=0;for(f=g.length;c<f;c++){var h=g[c];a[b][h]=a[b].factory(h)}a[b].snippetVersion="4.1.0";c=d.createElement(e);d=d.getElementsByTagName(e)[0];c.async=1;c.src={production:"https://cdn.api.virtusize.com/integration/v4.js",staging:"https://cdn.staging.virtusize.com/integration/v4.js",japan:"https://cdn.api.virtusize.jp/integration/v4.js",korea:"https://cdn.api.virtusize.kr/integration/v4.js",local:"//"+a[b].url+"/integration/v4.source.js"}[a[b].env];c.id="vs-integration";d.parentNode.insertBefore(c,d)})(window,document,"script","vs");

    vs.setApiKey("API_KEY");
    vs.addWidget({
        productId: "PRODUCT_ID",
        buttonSelector: "BUTTON_SELECTOR",
        productImageUrl: "PRODUCT_IMAGE_URL",
        done: function(error) {
            this.on("user-opened-panel-compare", function() {
                // This callback is called when a User
                // compares an item.
                // Use this to detect actual Virtusize usage.
            });
        }
    });
    </script>
    <!-- End Virtusize Integration -->


.. _label-setting-the-product-id:

Setting the Product ID
----------------------

The integration snippet needs the unique product ID to identify what measurements
to use. The value ``PRODUCT_ID`` should be the actual identifier of the product.
The Product ID must be unique for that product and should be an identifier that
identifies the product regardless of size or color. The Product ID in the snippet
needs to be the same as the ID that is in the Virtusize product database.


.. _label-setting-the-product-image-url:

Setting the Product Image URL
-----------------------------

The Virtusize Widget includes an image of the product the customer is currently
looking at, as well as images of the items they have previously purchased. The
image will only be downloaded once from your URL and then distributed through our
worldwide CDN.

The ideal image dimensions are ``width: 360px; height: 500px`` with a safe area
around the left and right edges to prevent cropping.

The product image url must be a complete URL, including the protocol, eg. ``http:``.


.. _label-setting-the-css-selector:

Setting the CSS selector
------------------------

Any button selector can be used, the choice is yours. Normally, an ID is recommended
when only one button is present on the page, and a class when having multiple buttons.

For example, if you use ``id="virtusize-button"`` on the button element, then set as line 3:

.. code-block:: javascript
   :linenos:

    vs.addWidget({
         productId: "PRODUCT_ID",
         buttonSelector: "#virtusize-button",
         productImageUrl: "PRODUCT_IMAGE_URL"
    });


.. _label-phpv-tooltip:

Purchase History Preview Tooltip
--------------------------------

This is a tooltip that shows a recent item from the user’s purchase history.
It is inspired by the Bootstrap Tooltip.

To enable this, add line 5 to your integration. Lines 6 and 7 are optional:

.. code-block:: javascript
   :linenos:

    vs.addWidget({
         productId: "PRODUCT_ID",
         buttonSelector: "BUTTON_SELECTOR",
         productImageUrl: "PRODUCT_IMAGE_URL",
         tooltipEnabled: true,
         tooltipStyle: "light",    // default: dark
         tooltipPosition: "bottom" // default: top
    });


.. _label-cross-device-detection:

Cross Device Detection
----------------------

To make it possible for your customers to use Virtusize across different devices,
you need to provide Virtusize with your user ID. Enabling a customer that bought
an item from their smartphone to use that item as a reference when shopping from
their desktop computer.

User ID must match across product page and order confirmation page integration to
have effect. Set only if user ID is known.

.. code-block:: javascript
   :linenos:

   // User ID as string
   vs.setUserId("USER_ID");


.. _label-mobile-integration:

Mobile integration
------------------

Virtusize comes with a mobile version of the widget optimized for phones. When a
mobile browser is detected, the Virtusize integration automatically loads the
mobile widget instead of the desktop version.

You can force the Virtusize integration to load either the mobile or desktop
version. This is useful if you have a dedicated mobile website.

.. code-block:: javascript
   :linenos:

    // To force mobile
    vs.setMobile(true);

    // To force desktop
    vs.setMobile(false);
