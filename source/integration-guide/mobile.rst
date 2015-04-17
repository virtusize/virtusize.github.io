.. _label-mobile:

Mobile integration
==================

.. note::
    The mobile widget is still in beta and does not automatically load for all
    retailers. It will be launched in summer of 2015. Talk to your sales
    contact to find out more about the mobile widget.


Virtusize comes with a mobile version of the widget that is optimized for
phones. When a mobile browser is detected, the Virtusize integration
automatically loads the mobile widget.


Best practice
-------------

To achieve the best experience for your customers across devices, it is
recommended that you provide Virtusize with the user id during integration.
This must be the same user id as you used in the order confirmation.

We use this to identify the customers previous purchases and add them to his
personal purchase history. This allows him to compare two garments with one
click and is especially useful on mobile devices.

To add a user id you simply call this in your integration code:

.. highlight:: javascript

::

    // Add the users id. Same as during order confirmation.
    // User ID as string, set to null if unknown.
    vs.setUserId("UID_1234");


Automatic device detection
--------------------------

There is no need to configure anything for this to work on your end. However,
in case you are using a dedicated mobile website and have not yet integrated
with Virtusize, you need to do that. This works exactly the same as on your
desktop website.

Make sure you create and place a button for opening the Virtusize widget on the
mobile website and integrate by setting the same variables as you would on
a desktop page.


Manual device detection
-----------------------

If you experience that there is a difference between your own mobile site
detection and ours, you can force the Virtusize integration to load either the
mobile or the desktop version of the widget by calling:

::

    // To force mobile
    vs.setMobile(true);

    // To force desktop
    vs.setMobile(false);


