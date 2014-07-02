.. highlight:: javascript

.. _label-advanced-configuration:

Advanced Configuration - JavaScript API
=======================================


Renaming the Global Variable
----------------------------

You can choose yourself, under which global variable you want Virtusize to be
available on your page. The default here is ``vs``. If this is already used on
your site, then you can provide a different variable name as the last parameter
to the main function. 

The following is an example:

.. highlight:: html

::

    <!-- Virtusize Integration -->
    <script>
    !function(a,b,c,d,e,f,g){var h,i,j,k;for(a.Virtusize=e,a[e]=a[e]||[],a[e].methods=["setApiKey","setRegion","setLanguage","setWidgetOverlayColor","addWidget","ready","on","setAvailableSizes","setSizeAliases","addOrder","setUserId"],a[e].factory=function(b){return function(){var c;return c=Array.prototype.slice.call(arguments),c.unshift(b),a[e].push(c),a[e]}},k=a[e].methods,i=0,j=k.length;j>i;i++)h=k[i],a[e][h]=a[e].factory(h);a[e].snippetVersion="3.0.2",f=b.createElement(c),g=b.getElementsByTagName(c)[0],f.async=1,f.src=("https:"===a.location.protocol?"https://":"http://cdn.")+d,f.id="vs-integration",g.parentNode.insertBefore(f,g)}(window,document,"script","api.virtusize.com/integration/v3.js","myVs");

    myVs.setApiKey("0000000000000000000000000000000000000000");
    myVs.addWidget("PRODUCT_ID", "BUTTON_SELECTOR");
    </script>
    <!-- End Virtusize Integration -->


Dynamic integration (AJAX)
--------------------------

The Virtusize Integration v3 is designed to be used either statically by
integrating on page load or dynamically at a later state. This is useful for
retailers that have single page stores, where a product page loads dynamically
after an AJAX request and is presented as an overlay on the same page.

The API stays exactly the same, so you are free to choose your preferred way.
To add a widget after page load, you just call the same functions on the global
Virtusize object like this:

.. highlight:: javascript

::
    
    vs.addWidget("PRODUCT_ID", "BUTTON_SELECTOR");


When a widget for a different product id is added for a previously used button
selector, it will replace the widget for the old product with the new one. So
a click on the button will now open the most recent button.

You can obtain a VirtusizeWidget object after it has been initialized from the
global object like the following. To be sure, that the integration has loaded,
you can wrap it in the ready function:

::
   
    vs.ready(function() {
        var myWidget = vs.getWidget("PRODUCT_ID");
        // Do something with the widget
        myWidget.setAvailableSizes(["Medium"]);
    });



Snippet API
-----------

The snippet is the little JavaScript, that you include directly in your pages.
It creates method stubs for the most commonly used functions of the Virtusize
Integration. This enables you to call these methods immediately after the
snippet.

The method calls will be added to a queue that is executed after the
integration script has loaded asyncronously. From that point on all calls to
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


ready(callback)
    **callback** - Function that is called, when the integration script has
    loaded. These functions will be called after all the other functions of the
    initial queue have been executed. It does not mean that all product checks
    have been executed for the widgets. You should enclose calls to the snippet
    where you depend on the fact that the integration has run in this function.


Widget settings
^^^^^^^^^^^^^^^

The starting point for adding a Virtusize Widget is the ``addWidget`` method of
the snippet. The minimum requirement is to supply a product id and a button
selector:

::

    vs.addWidget("PRODUCT_ID", "BUTTON_SELECTOR");

For more complex situations you can pass an additional options object to the
``addWidget`` function. Here is an example:

::

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

It is also possible to only pass one JavaScript object to the function like
this:

::

    vs.addWidget({
        productId: "PRODUCT_ID",
        buttonSelector: "BUTTON_SELECTOR",
        productVersion: "1",
        availableSizes: ["M", "L"],
        sizeAliases: {"S": "Small", M": "Medium", "L": "Large"}
    });


The following are functions you can call on the widget object, for example
inside the ``done`` callback of ``addWidget`` or at a later stage when you get
the loaded widget from the global Virtusize Snippet object.

setAvailableSizes(sizesList)
    **sizesList** - Array, list of product sizes. 
    
    Sets the product sizes that are in stock, to be used in the widget. Must
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


.. _label-events-and-callbacks-v3:

Events and Callbacks
--------------------

The integration snippet provides a way to subscribe for event callbacks.
Use the ``on`` method directly on the Virtusize Snippet object like this:

::
    
    vs.on("PRODUCT_ID", "EVENT_NAME", function() { alert("Event fired."); });

or directly on a VirtusizeWidget object, for example inside an ``addWidget``
callback like this:

::

    vs.addWidget("PRODUCT_ID", "BUTTON_SELECTOR", {
        done: function(error) {
            this.on("EVENT_NAME", function() { alert("Event fired."); });
        }
    });

All callbacks functions will have ``this`` assigned to the VirtusizeWidget
instance this event originated from. In some cases there will be optional data
passed into the function as an argument. That is event specific.

.. note::
    Event callbacks are a volatile feature, new events can be added, renamed or
    removed without notification as the Virtusize product evolves.


The following events are supported:

user-saw-widget-button
    Triggered when the widget button is shown on the product page after
    a product check that resulted in a valid product.

user-opened-widget
    Triggered when the widget was opened.

user-closed-widget
    Triggered when the widget was closed.

user-added-product
    Triggered when a user successfully created a new item from
    measurements in the panel "new from measurements".

user-selected-size
    Triggered when a size was selected in the widget. Note: the callback
    function receives additional data containing the selected size ID and
    a boolean indicating if the size was auto-selected or not. ``{sizeId: "xl",
    auto: false}``

user-deleted-product
    Triggered when a user deleted an item from his wardrobe. This can be any
    item and does not necessarily match the product for which the widget was
    loaded.

.. user-clicked-survey-link

user-opened-panel-start
    Triggered when a user opened the panel "start".

user-opened-panel-new-from-measurements
    Triggered when a user opened the panel "new from measurements".

user-opened-panel-compare
    Triggered when a user opened the panel "compare".

user-opened-panel-edit-item
    Triggered when a user opened the panel "edit item".

user-opened-panel-wardrobe
    Triggered when a user opened the panel "wardrobe".

user-opened-panel-faq
    Triggered when a user opened the panel "faq".

user-opened-panel-login
    Triggered when a user opened the panel "login".

user-opened-panel-register
    Triggered when a user opened the panel "register".

user-opened-panel-forgot-password
    Triggered when a user opened the panel "forgot password".

user-opened-panel-benefits
    Triggered when a user opened the panel "benefits".

.. note:: 
    The **user-opened-panel-compare** event is probably the most useful event
    as it registers when a user compares items. Use this event to register
    Virtusize "uses".

