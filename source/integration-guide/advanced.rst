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
    !function(a,b,c,d,e,f,g){var h,i,j,k;for(a.Virtusize=e,a[e]=a[e]||[],a[e].methods=["setApiKey","setRegion","setLanguage","setLocale","setOverlayColor","addWidget","ready","on","setAvailableSizes","setSizeAliases","addOrder","setUserId"],a[e].factory=function(b){return function(){var c;return c=Array.prototype.slice.call(arguments),c.unshift(b),a[e].push(c),a[e]}},k=a[e].methods,i=0,j=k.length;j>i;i++)h=k[i],a[e][h]=a[e].factory(h);a[e].snippetVersion="3.0.0",f=b.createElement(c),g=b.getElementsByTagName(c)[0],f.async=1,f.src="https:"===a.location.protocol?"https://":"http://cdn."+d,f.id="vs-integration",g.parentNode.insertBefore(f,g)}(window,document,"script","api.virtusize.com/integration/v3.js","myVs");
    
    myVs.setApiKey('0000000000000000000000000000000000000000');
    myVs.addWidget('PRODUCT_ID', 'BUTTON_SELECTOR');
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
    
    vs.addWidget('PRODUCT_ID', 'BUTTON_SELECTOR');


When a widget for a different product id is added for a previously used button
selector, it will replace the widget for the old product with the new one. So
a click on the button will now open the most recent button.

You can obtain a VirtusizeWidget object after it has been initialized from the
global object like the following. To be sure, that the integration has loaded,
you can wrap it in the ready function:

::
   
    vs.ready(function() {
        var myWidget = vs.getWidget('PRODUCT_ID');
        // Do something with the widget
        myWidget.setAvailableSizes(['Medium']);
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
    length unit.

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
    optional.
    
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
       

setOverlayColor(rgba, ieColor)
    **rgba** - String, specifying the rgba color of the overlay background that
    is displayed when the Virtusize Widget is opened. Defaults to
    ``rbga(0,0,0,0.5)``

    **ieColor** - String, specifying the Internet Explorer color of the overlay
    background that is displayed when the Virtusize Widget is opened. Defaults
    to ``50000000``

    **Example:**

    ::

        vs.setOverlayColor('rgba(255,255,0,0.5)', '50FFFF00');


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

    vs.addWidget('PRODUCT_ID', 'BUTTON_SELECTOR');

For more complex situations you can pass an additional options object to the
``addWidget`` function. Here is an example:

::

    vs.addWidget('PRODUCT_ID', 'BUTTON_SELECTOR', {
        productVersion: '1',
        done: function(error) {
            if(!error) {
                this.setAvailableSizes(['S', 'M', 'L']);
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
        productId: 'PRODUCT_ID',
        buttonSelector: 'BUTTON_SELECTOR',
        productVersion: '1',
        availableSizes: ['M', 'L'],
        sizeAliases: {'S': 'Small', M': 'Medium', 'L': 'Large'}
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
    :ref:`label-events-and-callbacks-v3`

    **callback** - Function callable, function to call when an event occurs.
    Allows programmatic subscription to widget events such as: widget.close,
    widget.open, etc …

    **Example:**

    ::

        this.on("widget.iframe.opened", 
            function($, productId){ 
                alert("Widget opened!"); 
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
    
    vs.on('PRODUCT_ID', 'EVENT_NAME', function() { alert("Event fired."); });

or directly on a VirtusizeWidget object, for example inside an ``addWidget``
callback like this:

::

    vs.addWidget('PRODUCT_ID', 'BUTTON_SELECTOR', {
        done: function(error) {
            this.on('EVENT_NAME', function() { alert("Event fired."); });
        }
    });

All callbacks are called with two or more arguments. The first argument
will always be the jQuery global object ($), in case jQuery support is
needed inside the callback. The second argument is the current product
id. Any additional arguments are event specific.

.. note::
    Event callbacks are a volatile feature, new events can be added, renamed or
    removed without notification as the Virtusize product evolves.

The exact types of events will follow in the coming days in this documentation.


..
    The following events are supported:

    widget.validProduct
        Triggered when the product data has been validated, and the product
        measurements exist and are valid.

    widget.invalidProduct
        Triggered when the product data check has been performed, but the
        measurements for this product do not exist ore are not valid.

    widget.button.show
        Triggered after the widget button is shown on the product page.

    widget.button.click
        Triggered when a user clicks on the button, to open the widget.

    .. ---- review from here ----

    widget.open
        Triggered when the widget is opened.

    widget.introApp
        Triggered when a user sees the intro app (first screen for a new
        user).

    widget.getStartedApp
        Triggered when a user sees the get-started app (user clicks "next"
        button from intro app).

    widget.welcomeBackApp
        Triggered when a user opens the welcome-back app (if the user has
        used VS before and has at least one item in the wardrobe).

    widget.introApp.noTapeClick
        Triggered when a user clicks the "I do not have a tape measure" link
        in the intro app or the welcome-back app.

    widget.newFromMeasurementsApp
        Triggered when a user opens the new-from-measurements app, also
        known as the "third slide".

    widget.newFromMeasurementsApp.itemCreated
        Triggered when a user successfully creates a new item from
        measurements in the new-from-measurements app.

    widget.compareApp
        Triggered when a user compares the product in the compare view.

    .. note:: 
        The **widget.compareApp** event is probably the most useful event as it
        registers when a user compares items. Use this event to register Virtusize
        "uses".

    widget.compareApp.addNewItemClick
        Triggered when a user clicks the "Add new item" button in the
        wardrobe app (previously the compare app, hence the event name).

    widget.compareApp.saveWardrobeClick
        Triggered when a user clicks the "Save my wardrobe" button in the
        compare app.

    widget.sizeId.selected
        Triggered when a size is selected in the widget. Note: the third
        argument to the callback function will be an object containing the
        selected size ID and a boolean indicating if the size was
        auto-selected or not.

    widget.iOwnItClick
        Triggered when a user clicks the "i-own-it" button, from anywhere in
        the widget.

    widget.newFromReferenceApp
        Triggered when a user opens the new-from-reference app, the
        reference size selector from intro app.

    widget.newFromReferenceApp.itemCreated
        Triggered when a user successfully adds a new item by using an
        existing product as reference.

    widget.wardrobeApp
        Triggered when a user opens the wardrobe app.

    widget.wardrobeApp.itemDeleted
        Triggered when a user deletes an existing item from her wardrobe.

    widget.editItemApp
        Triggered when a user opens the edit item app, from either compare
        app or wardrobe app.

    widget.loginApp
        Triggered when user opens the login app.

    widget.registerApp
        Triggered when user opens the register app.

    widget.faqApp
        Triggered when user opens the faq app.

    widget.faqApp.sectionClicked
        Triggered when a user clicks an faq section. Note: the third
        argument to the callback function will be the section ID (qa1-qa10).

    widget.close
        Triggered when the widget is closed.


