.. highlight:: javascript

.. _label-javascript-api:

JavaScript API v2
=================

.. note::
    This integration version is out of date. Please use the new integration v3
    or upgrade your old integration v2. See: :ref:`label-integration-v3` or
    follow our :ref:`label-upgrade-guide`.

VirtusizeWidget
---------------

The ``vsWidget`` object allows for programmatic configuration of the widget.
Depending on your chosen integration type you either have access to a single
vsWidget object or to multiple objects used in the multi product integration.

::

    /*** Multi product integration ***/
    window.vsWidgetAsyncInit = [];
    window.vsWidgetAsyncInit.push(function(vsWidget) {
      // Setup and access first vsWidget
    });

    window.vsWidgetAsyncInit.push(function(vsWidget) {
      // Setup and access second vsWidget
    });

::

    /*** Single product integration ***/
    window.vsWidgetAsyncInit = function(vsWidget) {
      // Setup and access the only vsWidget
    };

The function ``vsWidgetAsyncInit`` is required and is called by the integration
script during loading.

This function has access to the ``vsWidget`` object and can configure it.


API Methods of the vsWidget object
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

Basic API
"""""""""

setApiKey(key)
    **key** - String

    Sets the API key required for vs widget.

    **Example:**

    ::

        vsWidget.setApiKey("0000000000000000000000000000000000000000");

setProductId(id)
    **id** - String, the unique product id.

    Use this to provide the product identifier.

    **Example:**

    ::

        vsWidget.setProductId("1234567890");

setButton(buttonElement)
    **buttonElement** - string, either a CSS selector or a jQuery object.

    If you want to use a custom DOM element as a button, use this. If this is
    not supplied, integration defaults to default button placed in
    **#vs-widget-button-container** element.  setButton will override any
    button-position strategy.

    **Example:**

    ::

       vsWidget.setButton(".special-vs-button");
       OR
       vsWidget.setButton($("button.vs-button"));

setButtonContainer(buttonContainer)
    **buttonContainer** - string, either a css selector or a jQuery
    object.

    If you want to use the default button, but use a different
    container, use this call.
    Default container is **#vs-widget-button-container**

    **Example:**

    ::

        vsWidget.setButtonContainer(".special-vs-button-container");


Advanced API
""""""""""""

setButtonStrategy(strategy)
    **strategy** - function callable, function must return a DOM element
    representing the button. 
    
    Sets a button strategy to use, see :ref:`label-button-strategies` for more
    information. You can use any DOM element on your page to trigger the
    widget functionality.

    **Example:**

    ::

        vsWidget.setButtonStrategy(function($){
            return $(".some-element-we-can-use-as-button");
        });

setButtonPositionStrategy(strategy)
    **strategy** - function callable, function must return a container where to
    place the button.
    
    Set a button position strategy to use, see
    :ref:`label-button-position-strategies` for more information.

    **Example:**

    ::

        vsWidget.setButtonPositionStrategy(function($){
            return $(".some-element-we-can-use-as-container");
        });

setProductData(productData)
    **productData** - Object, containing the product data.
    
    Shortcut to be able to provide the product data directly, this allows you
    to set more than just product id, you can also provide a name and other
    variables.  This is required for feeds integration.
    
    **Example:**

    ::

        vsWidget.setProductData({id: "1234567890", version: "v1"});

setProductDataStrategy(strategy)
    **strategy** - function callable, function must return product data.
    
    Set a product data strategy to use, see
    :ref:`label-product-data-strategies` for more information.

    **Example:**

    ::

        vsWidget.setProductDataStrategy(function($){
            return $(".some-element-that-contains-product-id").text();
        });

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

        vsWidget.setLanguage("en");
        OR
        vsWidget.setLanguage("en-GB");
       

setRegion(regionId)
    **regionId** - String, region identifier as defined by ISO 3166-1 alpha-2
    
    Sets the preferred region to be used in widget, The region id must be the
    two-letter ISO-3166 country code as defined in
    http://en.wikipedia.org/wiki/ISO_3166-1_alpha-2 Region controls the default
    length unit.

    **Example:**

    ::

        vsWidget.setRegion("GB");
        OR
        vsWidget.setRegion("US");

setAvailableSizes(sizesList)
    **sizesList** - Array, list of product sizes. 
    
    Sets the product sizes that are in stock, to be used in the widget. Must
    contain the original size identifiers, not the regional names. The names
    provided here must correspond to size identifiers for each product.

    **Example:**

    ::

        vsWidget.setAvailableSizes(["S", "M", "L"]);
        OR
        vsWidget.setAvailableSizes(["1432", "4123", "2314"]);

setSizeAliases(sizeAliases)
    **sizeAliases** - Object, containing the sizes and their aliases.
    
    Sets the alternative product sizes names. Maps to original size names. Use
    this for regional size names.

    **Example:**

    ::

        vsWidget.setSizeAliases({
            "S": "UK 6",
            "M": "UK 10",
            "L": "UK 14"
        });

bindCallback(eventName, callback)
    **eventName** - String, valid event to bind a callback to. See
    :ref:`label-events-and-callbacks`

    **callback** - Function callable, function to call when an event occurs.
    Allows programmatic subscription to widget events such as: widget.close,
    widget.open, etc...

    **Example:**

    ::

        vsWidget.bindCallback("widget.open", 
            function($, productData){ 
                alert("Widget opened!"); 
            }
        );

unbindCallback(eventName, [callback])
    **eventName** - String, valid event to unbind a callback from.

    **callback** - optional - Function callable, function unbind, must be the
    real function reference.  Unbinds any callbacks registered. If not provided
    with a callback reference will unbind all callbacks to the provided event
    name.

.. note:: 

    For single product integrations the vsWidget object is also available for
    reference via **window.Virtusize.vsWidget** after the call to the
    **vsWidgetAsyncInit** function. For multiple products this reference is
    pointing to the first vsWidget instance.


**Integration script source**

The source code of the integration script is available at:
http://api.virtusize.com/api/vs-widget/v2/vs-widget.js?source


**Product data strategies**

The simplest product data strategy for single product integrations is to
only provide a unique product identifier. For that you can use the
**setProductId** call on the **vsWidget** object.


.. note:: 

    There is no default product data strategy, at least the product id must
    always be provided.


Product identifier example
""""""""""""""""""""""""""

::

    /*** Virtusize Widget parameters and initialization ***/
    window.vsWidgetAsyncInit = function(vsWidget) {

      vsWidget.setApiKey("0000000000000000000000000000000000000000");
      vsWidget.setProductId("PRODUCT_ID");

    };


.. note::

    The **setProductId** method is a shortcut to **setProductDataStrategy**, it
    creates a strategy that returns product data with the provided product id.


.. _label-product-data-strategies:

Custom product data strategy
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

The product data strategy is a very versatile way to resolve product
data. For example, assume the product id always exists on a page in a
span element with id ``product-identifier`` and for some reason it is
not feasible to output this id directly into the integration snippet
with the use of ``setProductId``. Instead we can write a custom product
data strategy that resolves the product data by reading the product id
from the span element.


Custom product data strategy example
""""""""""""""""""""""""""""""""""""

::

    /*** Virtusize Widget parameters and initialization ***/
    window.vsWidgetAsyncInit = function(vsWidget) {

      vsWidget.setApiKey("0000000000000000000000000000000000000000");
      vsWidget.setProductDataStrategy(function($) {
      
        var pid = $('#product-identifier').text();
        return {
          "id" : pid
        };
      });
    };

.. highlight:: html

::

    <span id="product-identifier">PRODUCT_ID</span>

The function ``setProductDataStrategy`` takes one parameter, a function
callable that will be executed and passed the jQuery instance as the
first argument. The strategy is expected to return a JSON object with at
least the **id** field set.


.. _label-button-strategies:

Button strategies
^^^^^^^^^^^^^^^^^

Integration needs to know where to place the Virtusize button. By
default, it will try to place a standard button inside an element with
id of ``vs-widget-button-container``. However any DOM element can be
used as the Virtusize button. Button strategies can be used to bind any
DOM element to act as the Virtusize button. Button strategies take
precedence over button position strategies.


Custom button example
"""""""""""""""""""""

.. highlight:: javascript

::

    /*** Virtusize Widget parameters and initialization ***/
    window.vsWidgetAsyncInit = function(vsWidget) {
     
      vsWidget.setApiKey("0000000000000000000000000000000000000000");
      vsWidget.setProductId("PRODUCT_ID");
      
      vsWidget.setButton('.some-class');
    };


Custom button strategy example
""""""""""""""""""""""""""""""

::

    /*** Virtusize Widget parameters and initialization ***/
    window.vsWidgetAsyncInit = function(vsWidget) {
     
      vsWidget.setApiKey("0000000000000000000000000000000000000000");
      vsWidget.setProductId("PRODUCT_ID");
      
      vsWidget.setButtonStrategy(function($){
        var button = $('<button>Dynamic button</button>').appendTo($('.product-description'))
        return button;
      });

    };


.. _label-button-position-strategies:

Button position strategies
^^^^^^^^^^^^^^^^^^^^^^^^^^

If no button strategy is provided, a default button position strategy is
used as a fallback. The fallback strategy will position the button
inside an element with the id of ``vs-widget-button-container``.


Button position strategy example
""""""""""""""""""""""""""""""""

::

    /*** Virtusize Widget parameters and initialization ***/
    window.vsWidgetAsyncInit = function(vsWidget) {
     
      vsWidget.setApiKey("0000000000000000000000000000000000000000");
      vsWidget.setProductId("PRODUCT_ID");
      
      //Use .product-description as the container for the default VS button.
      vsWidget.setButtonContainer('.product-description');
    };


Custom Button position strategy example
"""""""""""""""""""""""""""""""""""""""

::

    /*** Virtusize Widget parameters and initialization ***/
    window.vsWidgetAsyncInit = function(vsWidget) {
     
      vsWidget.setApiKey("0000000000000000000000000000000000000000");
      vsWidget.setProductId("PRODUCT_ID");
      
      //Custome element created as container.
      vsWidget.setButtonPositionStrategy(function($){
        var container = $('<div id="custom-vs-widget-button-container"></div>');
        container.appendTo($('.product-page'));
        return container;
      });
    };



.. note::
    The button strategy can return any DOM or jQuery element. The id
    on the element is not mandatory.  However the element should be a block
    level element.



.. _label-events-and-callbacks:

Events and Callbacks
--------------------

The integration snippet provides a way to subscribe for event callbacks.
Use the ``bindCallback`` method on the ``vsWidget`` object to register
callbacks.

All callbacks are called with two or more arguments. The first argument
will always be the jQuery global object ($), in case jQuery support is
needed inside the callback. The second argument is the current product
data object which has at least the ``id`` property. Any additional
arguments are event specific.

.. note::
    Event callbacks are a volatile feature, new events can be added, renamed or
    removed without notification as the Virtusize product evolves.


The following events are supported:

Button events
^^^^^^^^^^^^^

widget.validProduct
    Triggered when the product data has been validated, and the product
    measurements exist and are valid.

widget.button.show
    Triggered after the widget button is shown on the product page.

widget.button.click
    Triggered when a user clicks on the button, to open the widget.


Widget events
^^^^^^^^^^^^^

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


Event callback example
^^^^^^^^^^^^^^^^^^^^^^

.. highlight:: html

::

    <script type="text/javascript">
    /*** Virtusize Widget parameters and initialization ***/
    window.vsWidgetAsyncInit = function(vsWidget) {

        vsWidget.setApiKey("0000000000000000000000000000000000000000");
        vsWidget.setProductId("0123456789");
        
        vsWidget.bindCallback("widget.button.show", function($, productData){
        
            alert("The Virtusize button is now visible.");
            
        });
        
        vsWidget.bindCallback("widget.faqApp.sectionClicked", function($, productData, sectionId){
        
            alert("User read section " + sectionId + " in the FAQ app.");
            
        });
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


