.. _label-data-tracking:

Data tracking - Events and Callbacks
====================================

The integration has the ability to trigger custom callback functions on specific
events. You can use these for a number of things including analytics and custom
behaviour on the product pages.


.. _label-registering-callbacks:

Registering callbacks
---------------------

To subscribe for event callbacks, use the ``on`` method on the global Virtusize object:

::

    vs.on("PRODUCT_ID", "EVENT_NAME", function() { alert("Event fired."); });

or directly in the ``addWidget`` call:

.. code-block:: javascript
   :linenos:

    vs.addWidget({
         productId: "PRODUCT_ID",
         buttonSelector: "BUTTON_SELECTOR",
         productImageUrl: "PRODUCT_IMAGE_URL",
         done: function(error) {
            this.on("EVENT_NAME", function() { alert("Event fired."); });
         }
    });

All callbacks functions will have ``this`` assigned to the VirtusizeWidget
instance this event originated from. In some cases there will be optional data
passed into the function as an argument. That is event specific.

.. note::
    Event callbacks are a volatile feature and events can be added, renamed or
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
    function receives additional data containing the selected size and
    a boolean indicating if the size was auto-selected or not. ``{size: "xl",
    auto: false}``

user-deleted-product
    Triggered when a user deleted an item from his wardrobe. This can be any
    item and does not necessarily match the product for which the widget was
    loaded.  (Not available on mobile)

.. user-clicked-survey-link

user-opened-panel-start
    Triggered when a user opened the panel "start".

user-opened-panel-new-from-measurements
    Triggered when a user opened the panel "new from measurements". (Not available on mobile)

user-opened-panel-compare
    Triggered when a user opened the panel "compare".

user-opened-panel-measurements
    Triggered when a user opened the panel “compare”, but only showing measurements.
    (Not available on mobile)

user-opened-panel-edit-item
    Triggered when a user opened the panel "edit item". (Not available on mobile)

user-opened-panel-wardrobe
    Triggered when a user opened the panel "wardrobe".

user-opened-panel-add-edit
	Triggered when a user opened the product list to select a different reference
	garment. (Available only on mobile).

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
    The ``user-opened-panel-compare`` event is probably the most useful event
    as it registers when a user compares items. Use this event to register
    Virtusize "uses".
