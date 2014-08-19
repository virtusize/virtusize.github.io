.. _label-integration-v3:

Product Page Integration
========================

**Dependencies**

At this moment, the integration has only one dependency, jQuery 1.3 or later.
If jQuery is not found on the page, the integration script will asynchronously
load jQuery from the Google CDN (this will not slow down the page as it is done
asynchronously and most clients already have it cached).

**Asynchronous loading**

All script loading is done asynchronously, minimizing the impact on the load
speed of the product page. The integration snippet is inspired by the
asynchronous loading done by Google Universal Analytics, FB Connect, Google+
and others. In the unlikely event of Virtusize servers experiencing down time,
the product page will not be impacted other than that the button won't show.

.. _label-integration-snippet:

Integration Snippet
-------------------

Integrating the Virtusize Widget requires embedding an integration snippet on
the product page just before the closing ``</body>``. The code is very similar
to Google Analytics or Facebook Connect. The most simple way is shown below.

.. highlight:: html

::

    <!-- Virtusize Integration -->
    <script>
    !function(a,b,c,d,e,f,g){var h,i,j,k;for(a.Virtusize=e,a[e]=a[e]||[],a[e].methods=["setApiKey","setRegion","setLanguage","setWidgetOverlayColor","addWidget","ready","on","setAvailableSizes","setSizeAliases","addOrder","setUserId"],a[e].factory=function(b){return function(){var c;return c=Array.prototype.slice.call(arguments),c.unshift(b),a[e].push(c),a[e]}},k=a[e].methods,i=0,j=k.length;j>i;i++)h=k[i],a[e][h]=a[e].factory(h);a[e].snippetVersion="3.0.2",f=b.createElement(c),g=b.getElementsByTagName(c)[0],f.async=1,f.src=("https:"===a.location.protocol?"https://":"http://cdn.")+d,f.id="vs-integration",g.parentNode.insertBefore(f,g)}(window,document,"script","api.virtusize.com/integration/v3.js","vs");
    
    vs.setApiKey("0000000000000000000000000000000000000000");
    vs.addWidget("PRODUCT_ID", "BUTTON_SELECTOR");
    </script>
    <!-- End Virtusize Integration -->


.. note::
    The snippet defines an API key, product id and button selector to
    use. The values within quotes should be your actual API key, the actual
    product id and a CSS selector for the button you want to use to open the
    Virtusize Widget.


.. _label-using-a-button:

Using a Button
--------------

You can use any element on your product pages to open the Virtusize Widget. You
have full control over the placement and appearance of the button. It is even
possible to use multiple buttons to open the Virtusize Widget for the same
product.

Single Button
^^^^^^^^^^^^^

For using a button, create an element like this on your page. You can use any
DOM-id you like. A CSS class or anything selectable will work as well:

::
    
    <button id="virtusize-button" type="button" style="display:none;">Virtusize</button>

You can then use this button with your Virtusize Widget by specifying the
following during integration:

.. highlight:: javascript

::

    vs.addWidget("PRODUCT_ID", "#virtusize-button");


.. _label-multiple-buttons:

Multiple Buttons
^^^^^^^^^^^^^^^^

If you want multiple buttons to open the Virtusize Widget, you can add a class
to all buttons:

.. highlight:: html

::
    
    <button class="virtusize-buttons" type="button" style="display:none;">Virtusize</button>
    <a href="#" class="virtusize-buttons" style="visibility:hidden;">Virtusize</a>


and integrate a Widget like this:

.. highlight:: javascript

::

    vs.addWidget("PRODUCT_ID", ".virtusize-buttons");


The element you create should not be visible when the page loads. It will
automatically appear, when there is a valid product in the Virtusize database.
This way you don't have to worry about a product and its measurements being
available and valid or not.

You can either set the buttons style to ``visibility:hidden`` or to
``display:none`` or both. That gives you the flexibility you need, depending on
your layout.

If you don't set the style of the button to one of the above values, it will be
hidden by the Virtusize Integration, but some flickering may occur.

For the standard integration, the measurements are provided to Virtusize via
the Virtusize admin interface (see :ref:`label-providing-measurements`), and
the integration snippet only needs the unique product ID to identify what
measurements to use.  That is what line 6 does. The value ``PRODUCT_ID`` should
be the actual identifier of the product.

.. note::
    For best results, the product ID should be an identifier that
    identifies the product regardless of size and color.

No button will be visible on the product page until the integration snippet can
find the measurements for the product (until they are provided to Virtusize via
our admin or via the measurements feed).


Multiple Product Integration
----------------------------

It is possible to have Virtusize Widgets for more than one product per page.
This is needed for "Buy-this-outfit" kind of pages, for example.

The integration is the same as the one for single product pages. All you have
to do, is to supply the product ids and corresponding button selectors in
additional ``addWidget`` calls like this:

.. highlight:: javascript

::

    vs.addWidget("PRODUCT_ID_1", "#virtusize-button-1");
    vs.addWidget("PRODUCT_ID_2", "#virtusize-button-2");

.. note::
    You can only integrate one product with the same id per page. If you want
    multiple buttons to open the same widget, see:
    :ref:`label-multiple-buttons` for how to do this.


Providing Product Images
------------------------

The Virtusize Widget includes an image of the product the customer is currently
looking at as well as images of the items he has previously purchased.

The default image that is being used is the one provided in the `Open Graph
data <http://ogp.me>`_ of the product page. This is convenient to start out,
since you don't have to include an image in the ``addWidget`` call, if you
already have it in the OGP metatag.

But for added flexibility or advanced use cases it is possible to overwrite
this image with one actively provided to Virtusize like this

.. highlight:: javascript

::

    vs.addWidget({
        productId: "PRODUCT_ID",
        buttonSelector: "BUTTON_SELECTOR",
        productImageUrl: "PRODUCT_IMAGE_URL"
    });

That way you can select and provide an image that represents the product better
or is of a better quality.

The image will only be downloaded once from your URL and then distributed
through our Content Delivery Network.

.. note::
    The ideal image dimensions are ``width: 360px; height: 500px`` with
    a safe area around the left and right edges to prevent cropping of the
    actual content in the Virtusize Widget.


Troubleshooting
---------------

Verifying Integration
^^^^^^^^^^^^^^^^^^^^^

To check if the integration is successful or not, navigate your browser
to a product page. Append the string ``#hasVsWidget`` to the url in the
address bar.

For example:

::

    http://www.example.com/products/28657

becomes:

::

    http://www.example.com/products/28657#hasVsWidget

Press the enter-key to confirm and then hit the reload button on the
browser to reload the page. If the integration was successful, you will
get a popup indicating precisely that.


Button not showing
^^^^^^^^^^^^^^^^^^

The button is only shown, if there is a valid product found in the
Virtusize database or supplied in any other way. Make sure that there is
a valid product.

