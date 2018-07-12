# quick n' dirty procedural script to fetch the mob drops from the site
# and create a json file

require 'capybara'
require 'capybara/poltergeist'

# setup
Capybara.register_driver :selenium do |app|
  Capybara::Selenium::Driver.new(app, :browser => :chrome)
end

Capybara.current_driver = :selenium
page = Capybara::Session.new(:selenium)

# visit the main directory
page.visit 'https://www.helbreath.net/res_monster'
# find all urls in the page
mob_pages = page.all('.postcontent a').map { |a| a['href'] }
# init data hash
data = {}

forget_about = ['weapons', 'armours', 'rares', 'semi-']

# loop pages
mob_pages.each do |mob_page|
  # get npc name
  page.visit mob_page
  npc = mob_page.gsub('https://www.helbreath.net/res_monster?m=', '')
  puts npc
  table = page.find('.npcdrop')
  all_text = table.find_all('td')

  cleaned_drops = []

  all_text.each do |td|
    html = page.execute_script('return arguments[0].innerHTML;', td)

    if (html.include?('div'))
      drops = html.gsub(/<div.*?>|<\/div>/, '').split('<br>')
    else
      drops = html.split('<br>')
    end

    drops.each do |drop|
      drop = drop.downcase
      forget_about.each do |phrase|
        drop.gsub!(/#{phrase}/, '')
      end

      unless drop == ''
        if data.key?(drop.to_sym)
          data[drop.to_sym] << npc
        else
          data[drop.to_sym] = [npc]
        end
      end
    end
  end
end

open('./Src/data.json', 'w') do |f|
  f.puts data.to_json
end
