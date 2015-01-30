.. _label-integration-v3:

Product Page Integration
========================

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
    !function(a,b,c,d){var e,f,g,h,i,j,k,l,m;for(a.Virtusize=d,a[d]=a[d]||[],a[d].env=null!=a.vsEnv?a.vsEnv:"production",a[d].url=null!=a.vsUrl?a.vsUrl:a.location.host,a.vsEnv=void 0,a.vsUrl=void 0,a[d].methods=["setApiKey","setRegion","setLanguage","setWidgetOverlayColor","addWidget","ready","on","setAvailableSizes","setSizeAliases","addOrder","setUserId"],a[d].factory=function(b){return function(){var c;return c=Array.prototype.slice.call(arguments),c.unshift(b),a[d].push(c),a[d]}},m=a[d].methods,k=0,l=m.length;l>k;k++)f=m[k],a[d][f]=a[d].factory(f);a[d].snippetVersion="3.1.0",i=b.createElement(c),e=b.getElementsByTagName(c)[0],i.async=1,g="/integration/v3.js",h=".virtusize.com"+g,j={production:"api"+h,staging:"staging"+h,local:a[d].url+g+"?source"},i.src="//"+("https:"!==a.location.protocol&&"local"!==a[d].env?"cdn.":"")+j[a[d].env],i.id="vs-integration",e.parentNode.insertBefore(i,e)}(window,document,"script","vs");
    
    vs.setApiKey("0000000000000000000000000000000000000000");
    vs.addWidget({
        productId: "PRODUCT_ID",
        buttonSelector: "BUTTON_SELECTOR",
        productImageUrl: "PRODUCT_IMAGE_URL",
        done: function(error) {
            this.on("user-opened-panel-compare", function() {
                // This callback will get called, when a User
                // actually compares an item. Use this to detect
                // real Virtusize uses.
            });
        }
    });
    </script>
    <!-- End Virtusize Integration -->


.. note::
    The snippet defines an API key, product id, button selector and
    a productImageUrl to use. The values within quotes should be your actual
    API key, the actual product id, a CSS selector for the button you want to
    use to open the Virtusize Widget and the URL to the product image.

You might have noticed the example callback within the ``done`` function. For
more information about this topic click here:
:ref:`label-events-and-callbacks-v3`

For more information about how to provide product images see:
:ref:`label-providing-product-images`



.. _label-providing-product-images:

Providing Product Images
------------------------

The Virtusize Widget includes an image of the product the customer is currently
looking at as well as images of the items they have previously purchased.

The default image that is being used is the one provided in the `Open Graph
data <http://ogp.me>`_ of the product page. This is convenient to start out,
since you don't have to include an image in the ``addWidget`` call if you
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


.. _label-using-a-button:

Using a Button
--------------

You can use any element on your product pages to open the Virtusize Widget.
It is even possible to use multiple buttons to open the Virtusize Widget 
for the same product.

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
automatically appear when there is a valid product in the Virtusize database.
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
to do is supply the product ids and corresponding button selectors in
additional ``addWidget`` calls like this:

.. highlight:: javascript

::

    vs.addWidget("PRODUCT_ID_1", "#virtusize-button-1");
    vs.addWidget("PRODUCT_ID_2", "#virtusize-button-2");

.. note::
    You can only integrate one product with the same id per page. If you want
    multiple buttons to open the same widget, see:
    :ref:`label-multiple-buttons` for how to do this.



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

The button is only shown if there is a valid product found in the
Virtusize database or supplied in any other way. Make sure that there is
a valid product.

