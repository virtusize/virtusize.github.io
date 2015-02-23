.. highlight:: javascript

.. _label-advanced-configuration:

Advanced Configuration - JavaScript API
=======================================


Renaming the Global Variable
----------------------------

You can choose yourself under which global variable you want Virtusize to be
available on your page. The default here is ``vs``. If this is already used on
your site, then you can provide a different variable name as the last parameter
to the main function. 

The following is an example:

.. highlight:: html

::

    <!-- Virtusize Integration -->
    <script>
    !function(a,b,c,d){var e,f,g,h,i,j,k,l,m;for(a.Virtusize=d,a[d]=a[d]||[],a[d].env=null!=a.vsEnv?a.vsEnv:"production",a[d].url=null!=a.vsUrl?a.vsUrl:a.location.host,a.vsEnv=void 0,a.vsUrl=void 0,a[d].methods=["setApiKey","setRegion","setLanguage","setWidgetOverlayColor","addWidget","ready","on","setAvailableSizes","setSizeAliases","addOrder","setUserId"],a[d].factory=function(b){return function(){var c;return c=Array.prototype.slice.call(arguments),c.unshift(b),a[d].push(c),a[d]}},m=a[d].methods,k=0,l=m.length;l>k;k++)f=m[k],a[d][f]=a[d].factory(f);a[d].snippetVersion="3.1.0",i=b.createElement(c),e=b.getElementsByTagName(c)[0],i.async=1,g="/integration/v3.js",h=".virtusize.com"+g,j={production:"api"+h,staging:"staging"+h,local:a[d].url+g+"?source"},i.src="//"+("https:"!==a.location.protocol&&"local"!==a[d].env?"cdn.":"")+j[a[d].env],i.id="vs-integration",e.parentNode.insertBefore(i,e)}(window,document,"script","vs");

    myVs.setApiKey("0000000000000000000000000000000000000000");
    myVs.addWidget("PRODUCT_ID", "BUTTON_SELECTOR");
    </script>
    <!-- End Virtusize Integration -->


Dynamic integration (AJAX)
--------------------------

The Virtusize Integration v3 is designed to be used either statically by
integrating on page load or dynamically at a later state. This is useful if you have a single page
store where a product page loads dynamically after an AJAX
request and is presented as an overlay on the same page.

The API stays exactly the same, so you are free to choose your preferred way.
To add a widget after page load, you just call the same functions on the global
Virtusize object like this:

.. highlight:: javascript

::
    
    vs.addWidget("PRODUCT_ID", "BUTTON_SELECTOR");


When a widget for a different product id is added for a previously used button
selector, it will replace the widget for the old product with the new one. So
a click on the button will now open the most recent widget.

You can obtain a VirtusizeWidget object after it has been initialised from the
global object like the following. To be sure that the integration has loaded
you can wrap it in the ready function:

::
   
    vs.ready(function() {
        var myWidget = vs.getWidget("PRODUCT_ID");
        // Do something with the widget
        myWidget.setAvailableSizes(["Medium"]);
    });



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
       

setWidgetOverlayColor(rgba, ieColor)
    **rgba** - String, specifying the rgba color of the overlay background that
    is displayed when the Virtusize Widget is opened. Defaults to
    ``rbga(0,0,0,0.5)``

    **ieColor** - String, specifying the Internet Explorer color of the overlay
    background that is displayed when the Virtusize Widget is opened. Defaults
    to ``50000000``

    **Example:**

    ::

        vs.setWidgetOverlayColor("rgba(255,255,0,0.5)", "50FFFF00");


setUserId(userId)
    **userId** - String, identifying the current user of the retailers online
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


Widget settings
^^^^^^^^^^^^^^^

The starting point for adding a Virtusize Widget is the ``addWidget`` method of
the snippet. The minimum requirement is to supply a product id and a button
selector::

    vs.addWidget("PRODUCT_ID", "BUTTON_SELECTOR");

For more complex situations you can pass an additional options object to the
``addWidget`` function. Here is an example::

    vs.addWidget("PRODUCT_ID", "BUTTON_SELECTOR", {
        productVersion: "1",
        done: function(error) {
            if(!error) {
                this.setAvailableSizes(["S", "M", "L"]);
            }
        }
    });

The productVersion from above is an example of an additional parameter for
a specific widget. It is mandatory for feed integrations. See:
:ref:`label-feed`

The other important thing to note is the ``done`` parameter. It takes
a function, that is called, after the product check for this widget has been
performed. It receives ``error`` as a parameter that is either ``false`` or an
error message. Inside the function you have access to the Virtusize Widget by
``this``.

.. highlight:: javascript

It is also possible to only pass one JavaScript object to the function like
this::

   vs.addWidget({
        productId: "PRODUCT_ID",
        buttonSelector: "BUTTON_SELECTOR",
        productVersion: "1",
        availableSizes: ["M", "L"],
        sizeAliases: {"S": "Small", "M": "Medium", "L": "Large"}
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
    :ref:`label-events-and-callbacks-v3` for a list of valid event names.

    **callback** - Function callable, function to call when an event occurs.
    Allows programmatic subscription to widget events such as: "user-opened-widget",
    "user-closed-widget". Inside the callback function ``this`` will be the
    instance of the VirtusizeWidget from which the event was triggered. On some
    events an additional data object is passed as a parameter to the function,
    see :ref:`label-events-and-callbacks-v3`

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


Purchase History Preview
^^^^^^^^^^^^^^^^^^^^^^^^

The Virtusize widget can be configured to show a tooltip for previewing
a recent item from the users purchase history.

The tooltip can be set to a light or a dark style, so you can choose the one
that matches your website's design best.

To enable the purchase history tooltip add the ``tooltipEnabled`` option to the
``addWidget`` call. Changing the style to ``light`` can be achieved with the
``tooltipStyle`` option, but this is optional and defaulting to dark.

**Example:**

::

    vs.addWidget({
        productId: "PRODUCT_ID",
        buttonSelector: "BUTTON_SELECTOR",
        productImageUrl: "PRODUCT_IMAGE_URL",
        tooltipEnabled: true,
        tooltipStyle: "light"
    });
