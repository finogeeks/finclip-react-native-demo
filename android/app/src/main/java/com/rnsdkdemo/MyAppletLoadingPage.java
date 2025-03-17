package com.rnsdkdemo;

import android.content.Context;
import androidx.annotation.NonNull;

import com.finogeeks.lib.applet.modules.appletloadinglayout.FinAppletDefaultLoadingPage;

public class MyAppletLoadingPage extends FinAppletDefaultLoadingPage {

    public MyAppletLoadingPage(@NonNull Context context) {
        super(context);
    }

    @Override
    public boolean hideTechSupport() {
        return true;
    }
}
