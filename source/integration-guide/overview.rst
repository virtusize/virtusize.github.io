.. _label-integration-v3:

Virtusize integration overview
==============================

Dependencies
------------
At this moment, the integration has only one dependency, jQuery 1.3 or later.
If jQuery is not found on the page, the integration script will asynchronously
load jQuery from the Google CDN (this will not slow down the page as it is done
asynchronously and most client browsers already have it cached).

Integration script hosting
--------------------------
The integration script is hosted on the global Amazon CDN CloudFront. The file itself has
a sane Cache-Control header value set to ensure that the client browser checks for updated versions
according to our release schedule.

Asynchronous loading
--------------------
All script loading is done asynchronously, minimising the impact on the load
time of the product page. The integration snippet is inspired by the
asynchronous loading done by Google Analytics, FB Connect, Google+
and others. In the unlikely event of Virtusize servers experiencing down time,
the product page will not be impacted other than that the button won't show.

We recommend including the integration snippet at the bottom of the page to
ensure minimal impact on the page load speed.

Integration flow
----------------
**Step 1**

Integration snippet is included in a <script> block at the bottom of the web page.
The snippet contains a skeleton API to allow complete async integration.


**Step 2**

As soon as the first line of the snippet executes, the snippet creates an array,
and all calls to the skeleton API are recorded in this "API calls array".
Besides providing the skeleton JS API, the snippet triggers the load of the integration script.

The integration script is loaded by inserting a <script> tag into the head element (using insertBefore call);
this is the most common way to include third-party scripts and ensure async loading.
(Google Analytics and FB tracking are built using the same method)
This means if anything goes wrong with loading the integration script, there will be no impact on the
product page.

**Step 3**

Once the integration script is loaded on the page, it looks for commands in the defined "API calls array".
If the array is empty, no integration occurs. Otherwise the integration script triggers the
presentation of the widget button, or in the case of confirmation page, triggers tracking calls to
record purchase history. All of the calls are async, to not impact user-experience on the web shop.

Note on product page integration
--------------------------------
The Virtusize widget opens as an iFrame on the product page, thus there is no CSS/JS pollution
of the product page, except the integration snippet and the integration script.
