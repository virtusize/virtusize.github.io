.. _label-additional-integration-options:

Additional Integration Options
==============================

.. _label-multiple-buttons-on-product-page:

Multiple Buttons on Product Page
--------------------------------

If you want multiple buttons to open the Virtusize Widget, you can add a class to
all buttons (eg. ``.virtusize-buttons``), instead of an ID as in the regular example
(see :ref:`label-setting-the-css-selector`). ID's are unique per page; classes aren't.

Then integrate a Widget like this, on line 3:

.. code-block:: javascript
   :linenos:

    vs.addWidget({
         productId: "PRODUCT_ID",
         buttonSelector: ".virtusize-buttons",
         productImageUrl: "PRODUCT_IMAGE_URL"
    });


.. _label-multiple-products-on-product-page:

Multiple Products on Product Page
---------------------------------

It is possible to have Virtusize Widgets for more than one product per page. This
is suitable for "Buy-this-outfit" kind of pages or AJAX-pages, like product preview.

.. note::
    Try this if you see errors like ``a[b].push is not a function`` on your page,
    caused by the integration.

The integration is the same as the one for single product pages, with one difference:
the first part of the code snippet should only load once per page. Move this section
to the static part of the page:

.. code-block:: html
   :linenos:

   <!-- Virtusize Integration -->
   <script>
   !(function(a,d,g,b){var c,h,e,f;a.Virtusize=b;a[b]=a[b]||[];a[b].env=null!=a.vsEnv?a.vsEnv:"production";a[b].url=null!=a.vsUrl?a.vsUrl:a.location.host;a.vsEnv=void 0;a.vsUrl=void 0;a[b].methods="setApiKey setRegion setLanguage setWidgetOverlayColor addWidget ready setMobile on setAvailableSizes setSizeAliases addOrder addFindByFit setUserId".split(" ");a[b].factory=function(c){return function(){var d;d=Array.prototype.slice.call(arguments);d.unshift(c);a[b].push(d);return a[b]}};f=a[b].methods;c=0;for(h=f.length;c<h;c++)e=f[c],a[b][e]=a[b].factory(e);a[b].snippetVersion="4.0.0";c=d.createElement(g);d=d.getElementsByTagName(g)[0];c.async=1;c.src={production:"https://cdn.api.virtusize.com/integration/v4.js",staging:"https://cdn.staging.virtusize.com/integration/v4.js",local:"//"+a[b].url+"/integration/v4.source.js"}[a[b].env];c.id="vs-integration";d.parentNode.insertBefore(c,d)})(window,document,"script","vs");

   vs.setApiKey("API_KEY");
   </script>
   <!-- End Virtusize Integration -->

Then call ``addWidget`` as usual in the dynamic part for each product:

.. code-block:: html
   :linenos:

   <script>
   vs.addWidget({
      ...
   });
   </script>


Avoiding product ID collision
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

For pages loaded with AJAX, to avoid conflicts with already loaded widgets with same product ID,
you can obtain a Virtusize widget object after it has been initialised from the global
object like the following. To be sure that the integration has loaded you can
wrap it in the ready function:

.. code-block:: javascript
   :linenos:

    vs.ready(function() {
        var myWidget = vs.getWidget("PRODUCT_ID");
        // Do something with the widget
        myWidget.setAvailableSizes(["Medium"]);
    });

.. note::
    You can only integrate one product with the same ID per page, meaning don't make mutiple
    ``addWidget`` calls with the same ``PRODUCT_ID`` on one page. If you want multiple
    buttons to open the same widget, see :ref:`label-multiple-buttons-on-product-page`.


Improving performance
^^^^^^^^^^^^^^^^^^^^^

By default, Virtusize is loaded from Ireland. There are two additional locations in Japan and
South Korea. These can be utilized if your store or users are closer to one of those locations
instead of the default.

To manually select a location, add this line *before* the integration:

.. code-block:: javascript
   :linenos:

    window.vsEnv = 'REGION';

.. note::
    ``REGION`` can be ``korea`` for South Korea or ``japan`` for Japan.


.. _label-snippet-api:

Snippet API
-----------

The snippet is the little JavaScript that you include directly in your pages.
It creates method stubs for the most commonly used functions of the Virtusize
Integration. This enables you to call these methods immediately after the
snippet.

The method calls will be added to a queue that is executed after the
integration script has loaded asyncronously. From that point on, all calls to
these methods will execute immediately.

Some of the methods work in a global way, like setting the API key or defining
a region. Other things can be specified on a widget to widget basis. Examples
for this would be setting the product ids or available sizes.


.. _label-global-settings:

Global settings
^^^^^^^^^^^^^^^

.. highlight:: javascript

setApiKey(key)
    **key** - String

    Sets the API key required for vs widget.

    **Example:**

    ::

        vs.setApiKey("0000000000000000000000000000000000000000");


setRegion(regionId)
    **regionId** - String, region identifier as defined by ISO 3166-1 alpha-2

    Sets the preferred region to be used in widget, The region id must be the
    two-letter ISO-3166 country code as defined in
    http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2 Region controls the default
    length unit. This value is then passed on to all widgets that are added
    afterwards without a region parameter.

    It is considered a convenience function for pages with multiple
    widgets of the same region. It does **not** have any effect on widgets,
    that have already been added.

    **Example:**

    ::

        vs.setRegion("GB");
        OR
        vs.setRegion("US");


setLanguage(languageId)
    **languageId** - String, language identifier in the format of
    "languageCode-regionCode".

    Sets the preferred language to be used in widget, The language id must
    follow the form: **languageCode[-regionCode]** where regionCode is
    optional. This value is then passed on to all widgets that are added
    afterwards without a language parameter.

    It is considered a convenience function for pages with multiple
    widgets of the same language. It does **not** have any effect on widgets,
    that have already been added.

    **languageCode** - two-letter ISO-639-1 language abbreviation as defined by
    http://en.wikipedia.org/wiki/List_of_ISO_639-1_codes

    **regionCode** - two-letter ISO-3166 country code where this language is
    spoken (optional) as defined in
    http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2 If the requested language
    is not supported, the call is ignored.

    **Example:**

    ::

        vs.setLanguage("en");
        OR
        vs.setLanguage("en-GB");


setWidgetOverlayColor(rgba)
    **rgba** - String, specifying the rgba color of the overlay background that
    is displayed when the Virtusize Widget is opened. Defaults to
    ``rbga(0,0,0,0.5)``

    **Example:**

    ::

        vs.setWidgetOverlayColor("rgba(255,255,0,0.5)");


setUserId(userId)
    **userId** - String, identifying the current user of the retailer's online
    store. It has to be a unique identifier that matches the one used on the
    order confirmation page. Setting the userId during integration enables
    Virtusize to show the personal purchase history to a user on a new device
    even before purchasing something at the store from this device.

    **Example:**

    ::

        vs.setUserId("UID_1234");


ready(callback)
    **callback** - Function that is called when the integration script has
    loaded. These functions will be called after all the other functions of the
    initial queue have been executed. It does not mean that all product checks
    have been executed for the widgets. You should enclose calls to the snippet
    where you depend on the fact that the integration has run in this function.


.. _label-widget-settings:

Widget settings
---------------

The starting point for adding a Virtusize Widget is the ``addWidget`` method of the
snippet. The other important thing to note is the ``done`` parameter. It takes a
function, that is called, after the product check for this widget has been
performed. It receives ``error`` as a parameter that is either ``false`` or an error
message. Inside the function you have access to the Virtusize Widget by ``this``.

.. code-block:: javascript
   :linenos:

    vs.addWidget({
         productId: "PRODUCT_ID",
         buttonSelector: "BUTTON_SELECTOR",
         productImageUrl: "PRODUCT_IMAGE_URL",
         productVersion: "1",
         availableSizes: ["M", "L"],
         sizeAliases: {"S": "Small", "M": "Medium", "L": "Large"},
         done: function(error) {
            if (!error) {
               this.setAvailableSizes(["S", "M", "L"]);
               // Or trigger event tracking, etc.
            }
         }
     });


The following are functions you can call on the widget object, for example
inside the ``done`` callback of ``addWidget`` like in the example above or at
a later stage when you get the loaded widget from the global Virtusize Snippet
object.

setAvailableSizes(sizesList)
    **sizesList** - Array, list of product sizes.

    Sets the product sizes that are in stock to be used in the widget. Must
    contain the original size identifiers, not the regional names. The names
    provided here must correspond to size identifiers for each product.

    **Example:**

    ::

        this.setAvailableSizes(["S", "M", "L"]);
        OR
        this.setAvailableSizes(["1432", "4123", "2314"]);


setSizeAliases(sizeAliases)
    **sizeAliases** - Object, containing the sizes and their aliases.

    Sets the alternative product sizes names. Maps to original size names. Use
    this for regional size names.

    **Example:**

    ::

        this.setSizeAliases({
            "S": "UK 6",
            "M": "UK 10",
            "L": "UK 14"
        });

on(eventName, callback)
    **eventName** - String, valid event to bind a callback to. See
    :ref:`label-registering-callbacks` for a list of valid event names.

    **callback** - Function callable, function to call when an event occurs.
    Allows programmatic subscription to widget events such as: "user-opened-widget",
    "user-closed-widget". Inside the callback function ``this`` will be the
    instance of the VirtusizeWidget from which the event was triggered. On some
    events an additional data object is passed as a parameter to the function,
    see :ref:`label-registering-callbacks`

    **Example:**

    ::

        this.on("user-opened-widget",
            function() {
                alert("Widget opened: " + this.getProductId());
            }
        );

off(eventName, [callback])
    **eventName** - String, valid event to unbind a callback from.

    **callback** - optional - Function callable, function unbind, must be the
    real function reference.  Unbinds any callbacks registered. If not provided
    with a callback reference will unbind all callbacks to the provided event
    name.
