require File.expand_path('../boot', __FILE__)

# Pick the frameworks you want:
require "active_model/railtie"
require "active_record/railtie"
require "action_controller/railtie"
require "action_mailer/railtie"
require "action_view/railtie"
require "sprockets/railtie"
# require "rails/test_unit/railtie"

#Required for google oauth
require 'google/api_client'
require 'google/api_client/client_secrets'
require 'json'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Dreams
  class Application < Rails::Application
    # Settings in config/environments/* take precedence over those specified here.
    # Application configuration should go into files in config/initializers
    # -- all .rb files in that directory are automatically loaded.

    # Set Time.zone default to the specified zone and make Active Record auto-convert to this zone.
    # Run "rake -D time" for a list of tasks for finding time zone names. Default is UTC.
    # config.time_zone = 'Central Time (US & Canada)'

    # The default locale is :en and all translations from config/locales/*.rb,yml are auto loaded.
    # config.i18n.load_path += Dir[Rails.root.join('my', 'locales', '*.{rb,yml}').to_s]
    # config.i18n.default_locale = :de
    $credentials = Google::APIClient::ClientSecrets.load

    $authorization = Signet::OAuth2::Client.new(
        :authorization_uri => $credentials.authorization_uri,
        :token_credential_uri => $credentials.token_credential_uri,
        :client_id => $credentials.client_id,
        :client_secret => $credentials.client_secret,
        :redirect_uri => $credentials.redirect_uris.first,
        :scope => ['https://www.googleapis.com/auth/plus.me'])

    $client = Google::APIClient.new
  end
end
